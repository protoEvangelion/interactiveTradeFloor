const merge = require('lodash/merge')

const browser = typeof window !== 'undefined'
const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 3000
const basename = `/${process.env.PUBLIC_PATH || ''}`.replace('//', '/')

require('dotenv').config()

/* istanbul ignore next */
const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    baseUrl: `http://${ip}:${port}${basename}`,
    apiUrl: `http://${ip}:${port}/api`,
    fbAppId: process.env.FB_ID,
    googleClientId: process.env.GOOGLE_ID,
    mongo: {
      options: {
        db: {
          safe: true,
        },
      },
    },
    basename,
    browser,
    ip,
    port,
  },
  test: {
    mongo: {
      uri: `mongodb://${ip}/floorplan`,
      options: {
        debug: false,
      },
    },
  },
  development: {
    mongo: {
      uri: `mongodb://${ip}/floorplan`,
      options: {
        debug: true,
      },
    },
  },
  production: {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    mongo: {
      uri: `mongodb://${ip}/floorplan`,
      options: {
        debug: false,
      },
    },
  },
}

module.exports = merge(config.all, config[config.all.env])
