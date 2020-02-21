const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const imageSchema = new Schema({ body: String });

const carSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrls: {
      type: [String],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    bodyType: {
      type: String,
      required: true
    },
    mileage: {
      type: Number,
      required: true
    },
    vin: {
      type: String,
      required: true
    },
    titleType: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    transmission: {
      type: String,
      required: false
    },
    cylinders: {
      type: Number,
      required: false
    },
    fuelType: {
      type: String,
      required: false
    },
    doorCount: {
      type: Number,
      required: false
    },
    condition: {
      type: String,
      required: false
    },
    driveType: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: true
    },
    isFirmOnPrice: {
      type: Boolean,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    sellerType: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
