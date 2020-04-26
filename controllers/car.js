const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Car = require('../models/car');

exports.getCars = (req, res, next) => {
  Car.find()
    .then((cars) => {
      res.status(200).json({
        message: 'Fetched Cars successfully!',
        cars: cars,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCarById = (req, res, next) => {
  const carId = req.params.carId;
  Car.findById(carId)
    .then((car) => {
      if (!car) {
        const error = new Error('Could not find car');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Car fetched successfully!', car: car });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCarByMake = (req, res, next) => {
  const carMake = req.params.carMake;
  Car.find({ make: carMake })
    .then((cars) => {
      if (!cars) {
        const error = new Error('Could not find cars for that make');
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: 'Cars fetched Successfully!', cars: cars });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.getUserCars = (req, res, next) => {
//   const userId = req.params.userId;
//   Car.find({ creator: userId })
//     .then(cars => {
//       if (!cars) {
//         const error = new Error('Could not find user cars');
//         error.statusCode = 404;
//         throw error;
//       }
//       res
//         .status(200)
//         .json({ message: 'Cars fetched Successfully!', cars: cars });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

exports.createCar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect!');
    error.statusCode = 422;
    throw error;
  }
  console.log(req.body);
  const imageUrl = req.body.imageUrl;
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
  const location = req.body.location;
  const sellerType = req.body.sellerType;
  const sellerName = req.body.sellerName;
  const sellerPhone = req.body.sellerPhone;
  const car = new Car({
    imageUrl: imageUrl,
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
    location: location,
    sellerType: sellerType,
    sellerName: sellerName,
    sellerPhone: sellerPhone,
  });
  car
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Car created successfully',
        car: car,
      });
    })
    .catch((err) => {
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
  const carId = req.params.carId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect!');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.body.imageUrl;
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
  const location = req.body.location;
  const sellerType = req.body.sellerType;
  const sellerName = req.body.sellerName;
  const sellerPhone = req.body.sellerPhone;
  Car.findById(carId)
    .then((car) => {
      if (!car) {
        const error = new Error('Could not find car');
        error.statusCode = 404;
        throw error;
      }
      // if (imageUrls.length >= car.imageUrls.length) {
      //   for (let i = 0; i < imageUrls.length; i++) {
      //     if (imageUrls[i] !== car.imageUrls[i]) {
      //       clearImage(car.imageUrls[i]);
      //     }
      //   }
      // } else {
      //   for (let i = 0; i < car.imageUrls.length; i++) {
      //     if (car.imageUrls[i] !== imageUrls[i]) {
      //       clearImage(imageUrls[i]);
      //     }
      //   }
      // }
      car.imageUrl = imageUrl;
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
      car.location = location;
      car.sellerType = sellerType;
      car.sellerName = sellerName;
      car.sellerPhone = sellerPhone;
      return car.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: 'Car updated successfully!', car: result });
    })
    .catch((err) => {
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
    .then((car) => {
      if (!car) {
        const error = new Error('Could not find car');
        error.statusCode = 404;
        throw error;
      }
      for (let imgUrl of car.imageUrls) {
        clearImage(imgUrl);
      }
      return Car.findByIdAndRemove(carId);
    })
    .then((result) => {
      res.status(200).json({ message: 'Car Deleted' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  console.log(filePath);
  // console.log(path.join(__dirname, '..', filePath));
  // fs.unlink(filePath, err => console.log(err));
};
