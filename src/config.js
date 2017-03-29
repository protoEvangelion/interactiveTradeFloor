const merge = require('lodash/merge')

const browser = typeof window !== 'undefined'
const ip = process.env.IP || '127.0.0.1'
const port = process.env.PORT || 3000
const basename = `/${process.env.PUBLIC_PATH || ''}`.replace('//', '/')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    baseUrl: `http://${ip}:${port}${basename}`,
    apiUrl: `http://${ip}:${port}/api`,
    fbAppId: '991453140998882',
    googleClientId: '464712936089-q953apdu1bjiqtcjndktnnk1ts4f2cgv.apps.googleusercontent.com',
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
    ip: process.env.IP || '127.0.0.1',
    port: process.env.PORT || 8080,
    baseUrl: 'https://arc.diegohaz.com',
    apiUrl: 'https://arc.diegohaz.com/api',
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://heroku_kb0zhsht:kian09mg989lkjo36k6d7n63l0@ds145380.mlab.com:45380/heroku_kb0zhsht',
    },
  },
}

module.exports = merge(config.all, config[config.all.env])
