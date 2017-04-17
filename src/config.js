const merge = require('lodash/merge')

const browser = typeof window !== 'undefined'
const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 3000
const basename = `/${process.env.PUBLIC_PATH || ''}`.replace('//', '/')

/* istanbul ignore next */
const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    baseUrl: `http://${ip}:${port}${basename}`,
    apiUrl: `http://${ip}:${port}/api`,
    fbAppId: '991453140998882',
    googleClientId: '574611677035-1ku4apgtmudpr2eeemaf9vff0tsokhrp.apps.googleusercontent.com',
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
    baseUrl: 'https://arc.diegohaz.com',
    apiUrl: 'https://arc.diegohaz.com/api',
    mongo: {
      uri: process.env.MONGODB_URI,
    },
  },
}

module.exports = merge(config.all, config[config.all.env])
