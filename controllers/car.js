const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Car = require('../models/car');
const User = require('../models/user');

exports.getCars = (req, res, next) => {
  const currentPage = req.query.currentPage;
  const perPage = 24;
  let totalCars;
  Car.find()
    .countDocuments()
    .then(count => {
      totalCars = count;
      return Car.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(cars => {
      res.status(200).json({
        message: 'Fetched Cars successfully!',
        cars: cars,
        totalCars: totalCars
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCar = (req, res, next) => {
  const carId = req.params.carId;
  Car.findById(carId)
    .then(car => {
      if (!car) {
        const error = new Error('Could not find car');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Car fetched successfully!', car: car });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserCars = (req, res, next) => {
  const userId = req.params.userId;
  Car.find({ creator: userId })
    .then(cars => {
      if (!cars) {
        const error = new Error('Could not find user cars');
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: 'Cars fetched Successfully!', cars: cars });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createCar = (req, res, next) => {
  const imgUrls = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect!');
    error.statusCode = 422;
    throw error;
  }
  if (req.files.length <= 0) {
    const error = new Error('You must select at least 1 image.');
    error.statusCode = 422;
    throw error;
  }
  for (let img of req.files) {
    imgUrls.push(img.path);
  }
  const title = req.body.title;
  const imageUrls = imgUrls;
  const description = req.body.description;
  const year = req.body.year;
  const make = req.body.make;
  const model = req.body.model;
  const bodyType = req.body.bodyType;
  const mileage = req.body.mileage;
  const vin = req.body.vin;
  const titleType = req.body.titleType;
  const color = req.body.color;
  const transmission = req.body.transmission;
  const cylinders = req.body.cylinders;
  const fuelType = req.body.fuelType;
  const doorCount = req.body.doorCount;
  const condition = req.body.condition;
  const driveType = req.body.driveType;
  const price = req.body.price;
  const isFirmOnPrice = req.body.isFirmOnPrice;
  const location = req.body.location;
  const sellerType = req.body.sellerType;
  let creator;
  const car = new Car({
    title: title,
    imageUrls: imageUrls,
    description: description,
    year: year,
    make: make,
    model: model,
    bodyType: bodyType,
    mileage: mileage,
    vin: vin,
    titleType: titleType,
    color: color,
    transmission: transmission,
    cylinders: cylinders,
    fuelType: fuelType,
    doorCount: doorCount,
    condition: condition,
    driveType: driveType,
    price: price,
    isFirmOnPrice: isFirmOnPrice,
    location: location,
    sellerType: sellerType,
    creator: req.userId
  });
  car
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.cars.push(car);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Car created successfully',
        car: car,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.send('Too many images to upload');
      }
      next(err);
    });
};

exports.updateCar = (req, res, next) => {
  const imgUrls = [];
  const carId = req.params.carId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect!');
    error.statusCode = 422;
    throw error;
  }
  for (let img of req.files) {
    imgUrls.push(img.path);
  }
  const title = req.body.title;
  const imageUrls = imgUrls;
  const description = req.body.description;
  const year = req.body.year;
  const make = req.body.make;
  const model = req.body.model;
  const bodyType = req.body.bodyType;
  const mileage = req.body.mileage;
  const vin = req.body.vin;
  const titleType = req.body.titleType;
  const color = req.body.color;
  const transmission = req.body.transmission;
  const cylinders = req.body.cylinders;
  const fuelType = req.body.fuelType;
  const doorCount = req.body.doorCount;
  const condition = req.body.condition;
  const driveType = req.body.driveType;
  const price = req.body.price;
  const isFirmOnPrice = req.body.isFirmOnPrice;
  const location = req.body.location;
  const sellerType = req.body.sellerType;
  if (imageUrls.length <= 0) {
    const error = new Error('You have to select at least 1 image.');
    error.statusCode = 422;
    throw error;
  }
  Car.findById(carId)
    .then(car => {
      if (!car) {
        const error = new Error('Could not find car');
        error.statusCode = 404;
        throw error;
      }
      if (car.creator.toString() !== req.userId) {
        const error = new Error('Not Authorized');
        error.statusCode = 403;
        throw error;
      }
      if (imageUrls.length >= car.imageUrls.length) {
        for (let i = 0; i < imageUrls.length; i++) {
          if (imageUrls[i] !== car.imageUrls[i]) {
            clearImage(car.imageUrls[i]);
          }
        }
      } else {
        for (let i = 0; i < car.imageUrls.length; i++) {
          if (car.imageUrls[i] !== imageUrls[i]) {
            clearImage(imageUrls[i]);
          }
        }
      }
      car.title = title;
      car.imageUrls = imageUrls;
      car.description = description;
      car.year = year;
      car.make = make;
      car.model = model;
      car.bodyType = bodyType;
      car.mileage = mileage;
      car.vin = vin;
      car.titleType = titleType;
      car.color = color;
      car.transmission = transmission;
      car.cylinders = cylinders;
      car.fuelType = fuelType;
      car.doorCount = doorCount;
      car.condition = condition;
      car.driveType = driveType;
      car.price = price;
      car.isFirmOnPrice = isFirmOnPrice;
      car.location = location;
      car.sellerType = sellerType;
      return car.save();
    })
    .then(result => {
      res
        .status(200)
        .json({ message: 'Car updated successfully!', car: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.send('Too many images to upload');
      }
      next(err);
    });
};

exports.deleteCar = (req, res, next) => {
  const carId = req.params.carId;
  Car.findById(carId)
    .then(car => {
      if (!car) {
        const error = new Error('Could not find car');
        error.statusCode = 404;
        throw error;
      }
      if (car.creator.toString() !== req.userId) {
        const error = new Error('Not Authorized');
        error.statusCode = 403;
        throw error;
      }
      for (let imgUrl of car.imageUrls) {
        clearImage(imgUrl);
      }
      return Car.findByIdAndRemove(carId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.cars.pull(carId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Car Deleted' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = filePath => {
  console.log(filePath);
  // console.log(path.join(__dirname, '..', filePath));
  // fs.unlink(filePath, err => console.log(err));
};
