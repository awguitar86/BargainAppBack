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