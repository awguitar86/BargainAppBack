const express = require('express')

const feedController = require('../controllers/feed')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/items', isAuth, feedController.getItems)

router.post('/item', isAuth, feedController.createItem)

router.get('/item/:itemId', isAuth, feedController.getItem)

router.put('/item/:itemId', isAuth, feedController.updateItem)

router.delete('/item/:itemId', isAuth, feedController.deleteItem)

module.exports = router