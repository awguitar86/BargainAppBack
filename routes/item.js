const express = require('express')

const itemController = require('../controllers/item')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', itemController.getItems)

router.get('/:itemId', itemController.getItem)

router.get('/:userId', isAuth, itemController.getUserItems)

router.post('/', isAuth, itemController.createItem)

router.put('/:itemId', isAuth, itemController.updateItem)

router.delete('/:itemId', isAuth, itemController.deleteItem)

module.exports = router