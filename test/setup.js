import { EventEmitter } from 'events'
import { Mockgoose } from 'mockgoose'
import mongoose from '../src/services/mongoose'
import { mongo } from '../src/config'

EventEmitter.defaultMaxListeners = Infinity
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

const mockgoose = new Mockgoose(mongoose)

beforeAll(() => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost:27017/arc-test')
    mongoose.connection.on('connected', () => {
      console.log('db connection is now open')
    })
  })
})

afterAll(() => {
  mongoose.disconnect()
})

afterEach(async () => {
  const { collections } = mongoose.connection
  const promises = []
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].remove())
  })
  await Promise.all(promises)
})
