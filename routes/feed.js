const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

router.get('/items', feedController.getItems)

module.exports = router