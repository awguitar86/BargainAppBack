const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

router.get('/items', feedController.getItems)

router.post('/item', feedController.createItem)

// router.get('/item/:itemId', feedController.getItem)

// router.put('/item/:itemId', feedController.updateItem)

// router.delete('/item/:itemId', feedController.deleteItem)

module.exports = router