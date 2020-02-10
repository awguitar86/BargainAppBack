const { validationResult } = require('express-validator')
const Item = require('../models/item')

exports.getItems = (req, res, next) => {
  const currentPage = req.query.currentPage
  const perPage = 36
  let totalItems
  Item
    .find()
    .countDocuments()
    .then(count => {
      totalItems = count
      return Item.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
    })
    .then(items => {
      res
        .status(200)
        .json({
          message: 'Fetched Items successfully!',
          items: items,
          totalItems: totalItems
        })
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.createItem = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect!')
    error.statusCode = 422
    throw error
  }
  if(!req.file) {
    const error = new Error('No image provided!')
    error.statusCode = 422
    throw error
  }
  const imageUrl = req.file.path
  const title = req.body.title
  const category = req.body.category
  const condition = req.body.condition
  const description = req.body.description
  const price = req.body.price
  const isFirmOnPrice = req.body.isFirmOnPrice
  const location = req.body.location
  const item = new Item({
    title: title,
    imageUrl: imageUrl,
    category: category,
    condition: condition,
    description: description,
    price: price,
    isFirmOnPrice: isFirmOnPrice,
    location: location
  })
  item.save()
    .then( result => {
      res.status(201).json({
        message: 'Item created successfully!',
        item: item
      })
    })
    .catch( err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}