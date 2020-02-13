const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const Item = require('../models/item')
const User = require('../models/user')

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
  let creator
  const item = new Item({
    title: title,
    imageUrl: imageUrl,
    category: category,
    condition: condition,
    description: description,
    price: price,
    isFirmOnPrice: isFirmOnPrice,
    location: location,
    creator: req.userId
  })
  item.save()
    .then( result => {
      return User.findById(req.userId)
    })
    .then(user => {
      creator = user
      user.items.push(item)
      return user.save()
    })
    .then(result => {
      res.status(201).json({
        message: 'Item created successfully',
        item: item,
        creator: {_id: creator._id, name: creator.name}
      })
    })
    .catch( err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getItem = (req, res, next) => {
  const itemId = req.params.itemId
  Item.findById(itemId)
    .then(item => {
      if(!item) {
        const error = new Error('Could not find item')
        error.statusCode = 404
        throw error
      }
      res.status(200).json({message: 'Item fetched.', item: item})
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.updateItem = (req, res, next) => {
  const itemId = req.params.itemId
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
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
  if(!imageUrl) {
    const error = new Error('No file picked')
    error.statusCode = 422
    throw error
  }
  Item.findById(itemId)
    .then(item => {
      if(!item) {
        const error = new Error('Could not find item')
        error.statusCode = 404
        throw error
      }
      if(item.creator.toString() !== req.userId) {
        const error = new Error('Not Authorized')
        error.statusCode = 403
        throw error
      }
      if(imageUrl !== item.imageUrl) {
        clearImage(item.imageUrl)
      }
      item.title = title
      item.imageUrl = imageUrl
      item.category = category
      item.condition = condition
      item.description = description
      item.price = price
      item.isFirmOnPrice = isFirmOnPrice
      item.location = location
      return item.save()
    })
    .then(result => {
      res.status(200).json({message: 'Item updated', item: result})
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deleteItem = (req, res, next) => {
  const itemId = req.params.itemId
  Item.findById(itemId)
    .then(item => {
      if(!item) {
        const error = new Error('Could not find item')
        error.statusCode = 404
        throw error
      }
      if(item.creator.toString() !== req.userId) {
        const error = new Error('Not Authorized')
        error.statusCode = 403
        throw error
      }
      clearImage(item.imageUrl)
      return Item.findByIdAndRemove(itemId)
    })
    .then(result => {
      return User.findById(req.userId)
    })
    .then(user => {
      user.items.pull(itemId)
      return user.save()
    })
    .then(result => {
      res.status(200).json({message: 'Item Deleted'})
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath)
  fs.unlink(filePath, err => console.log(err))
}