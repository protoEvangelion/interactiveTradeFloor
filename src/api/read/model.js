import mongoose, { Schema } from 'mongoose'

const boothSchema = Schema({
  num: Number,
  type: String,
  row: Number,
  col: Number,
  owner: String,
  company: String,
  description: String,
  status: String,
})

module.exports = mongoose.model('Booth', boothSchema)
export default exports
