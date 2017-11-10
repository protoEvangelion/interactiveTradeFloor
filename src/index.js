require('babel-polyfill')
require('babel-core/register')({
  plugins: ['transform-es2015-modules-commonjs'],
})

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const webpackIsomorphicToolsConfig = require('../webpack/webpack-isomorphic-tools')
const express = require('express')

const assetServer = express()
const path = require('path')
const fs = require('fs')

const APP = '/app.4ad7eacae0eca38692ea.js'
const VENDOR = '/vendor.059f025d01c64a64393d.js'

const app = fs.readFileSync(path.join(__dirname, '../dist', APP))
const vendor = fs.readFileSync(path.join(__dirname, '../dist', VENDOR))

const privateKey = fs.readFileSync(path.join(__dirname, '../sslcert/server.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../sslcert/server.crt'), 'utf8')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .server('./', () => {
    console.log('setting up asset server')

    // assetServer.get('/', function (req, res) {
    //   console.log('app', path.join(__dirname, '../dist', APP))
    //   res.send(app)
    // })
    // assetServer.get(VENDOR, function (req, res) {
    //   res.send(vendor)
    // })

    assetServer.use(express.static(path.join(__dirname, '../dist')))
    console.log(path.join(__dirname, '../dist'))

    assetServer.listen(3001)

    require('./server')

  })
