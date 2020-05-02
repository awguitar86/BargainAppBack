const express = require('express');

const carController = require('../controllers/car');

const router = express.Router();

router.get('/', carController.getCars);

router.get('/:carId', carController.getCarById);

router.get('/make/:carMake', carController.getCarByMake);

router.post('/', carController.createCar);

router.put('/:carId', carController.updateCar);

router.delete('/:carId', carController.deleteCar);

module.exports = router;
