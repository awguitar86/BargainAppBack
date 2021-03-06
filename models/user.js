const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ],
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Car'
    }
  ]
})

module.exports = mongoose.model('User', userSchema)