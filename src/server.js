import { RouterContext, createMemoryHistory, match } from 'react-router'
import { basename, env, ip, mongo, port } from 'config'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

import Html from 'components/Html'
import { Provider } from 'react-redux'
/* eslint-disable no-console */
import React from 'react'
import { Router } from 'express'
import URL from 'url-parse'
import _ from 'lodash'
import api from 'api'
import configureStore from 'store/configure'
import cors from 'cors'
import csrf from 'csurf'
import express from 'services/express'
import laBoothModel from './api/read/laModel'
import lbBoothModel from './api/read/lbModel'
import mongoose from 'services/mongoose'
import qs from 'qs'
import routes from 'routes'
import serialize from 'serialize-javascript'
import { setCsrfToken } from 'store/actions'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import { syncHistoryWithStore } from 'react-router-redux'

const path = require('path')
// const http = require('http')
const https = require('https')
const fs = require('fs')

const nodemailer = require('nodemailer')

require('dotenv').config()

console.log('NODE_ENV ===>', process.env.NODE_ENV)

const TO = ''

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

const router = new Router()

router.get('/email', (req, res) => {
  const url = new URL(req.url)
  const query = qs.parse(url.query)

  const text = {
    data: `Booth #: ${query.num}
    Company: ${query.status === 'open' ? 'open' : query.company}
    Status: ${query.status}
    ${query.description === '' ? '' : `Info: ${query.description}`}
    `,
  }

  const mailOptions = {
    from: `${query.status === 'open' ? 'Booth Open' : query.owner} <${query.owner}@aoausa.com>`,
    to: 'ryantgarant@gmail.com', // process.env.EMAILS
    subject: `${query.num}=${query.status === 'open' ? 'Open' : query.company}`,
    text: text.data,
    html: `
      <strong>
        Booth #</strong> ${query.num} = ${query.status === 'open' ? 'open' : query.company}
      </br><br>
      <strong>
        Status:</strong> ${query.status}
      </br><br>
      <strong>
        Info: </strong> ${query.status === 'open' ? 'n/a' : query.description}</br>
    `,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).send('failure')
    }
    console.log(`Message ${info.messageId} sent: ${info.response}`)
    res.status(200).send('success')
  })
})

mongoose.connect(mongo.uri, {
  useMongoClient: true,
})

router.use('/api', cors(), api)

router.use(csrf({ cookie: true }))

router.use((req, res, next) => {
  if (env === 'development') {
    global.webpackIsomorphicTools.refresh()
  }

  const location = req.url.replace(basename, '')
  const memoryHistory = createMemoryHistory({ basename })
  const store = configureStore({}, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  store.dispatch(setCsrfToken(req.csrfToken()))

  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error || !renderProps) {
      return next(error)
    }

    const fetchData = () => new Promise((resolve, reject) => {
      const method = req.method.toLowerCase()
      const { params, location, components } = renderProps
      const promises = []

      components.forEach((component) => {
        if (component) {
          while (component && !component[method]) {
            // eslint-disable-next-line no-param-reassign
            component = component.WrappedComponent
          }
          component &&
            component[method] &&
            promises.push(component[method]({ req, res, params, location, store }))
        }
      })

      Promise.all(promises).then(resolve).catch(reject)
    })

    const render = (store) => {
      const renderHtml = (err, booths, path) => {
        if (err) {
          console.log(err)
        }
        const content = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
        const initialState = store.getState()
        const assets = global.webpackIsomorphicTools.assets()

        const boothsArr = [...booths]

        const preState = {
          ...initialState,
          booths: boothsArr,
          path,
        }
        const state = `window.__INITIAL_STATE__ = ${serialize(preState)}`
        const markup = <Html {...{ styles, assets, state, content }} />
        const doctype = '<!doctype html>\n'
        const html = renderToStaticMarkup(markup)

        return doctype + html
      }

      if (req.originalUrl === '/la') {
        laBoothModel.find((err, booths) => res.send(renderHtml(err, booths, 'la')))
      } else if (req.originalUrl === '/lb') {
        lbBoothModel.find((err, booths) => res.send(renderHtml(err, booths, 'lb')))
      }
    }

    return fetchData().then(() => {
      render(configureStore(store.getState(), memoryHistory))
    }).catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })
})

const app = express(router)

const privateKey = fs.readFileSync(path.join(__dirname, '../sslcert/server.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../sslcert/server.crt'), 'utf8')

const credentials = { key: privateKey, cert: certificate }

const server = https.createServer(credentials, app)

// const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  socket.on('save', (data) => {
    io.emit('save', data)
  })
})

server.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`local: https://${ip}:${port}`)
  }
})


export default app
