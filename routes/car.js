const express = require('express')

const carController = require('../controllers/car')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', carController.getCars)

router.get('/:carId', carController.getCar)

router.get('/:userId', isAuth, carController.getUserCars)

router.post('/', isAuth, carController.createCar)

router.put('/:carId', isAuth, carController.updateCar)

router.delete('/:carId', isAuth, carController.deleteCar)

module.exports = router