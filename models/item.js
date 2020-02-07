const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    firmOnPrice: {
      type: Boolean,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  }, { timestamps: true}
)

module.exports = mongoose.model('Item', itemSchema)