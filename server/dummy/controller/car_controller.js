/* eslint-disable camelcase */
/* eslint-disable max-len */
import shortid from 'shortid';
import db from '../db/db';
import Car from '../models/car_model';

/**
 * post a car ad
 * @param {object} req
 * @param {object} res
 */
const postCar = (req, res) => {
  const { id, email } = req.decoded;
  const userId = id;
  const userEmail = email;

  const car = new Car();
  car.id = shortid.generate();
  car.owner = userId;
  car.created_on = new Date();
  car.state = req.body.state;
  car.status = 'available';
  car.price = req.body.price;
  car.manufacturer = req.body.manufacturer;
  car.model = req.body.model;
  car.body_type = req.body.body_type;
  car.transmission_type = req.body.transmission_type;
  car.image_url = req.body.image_url;
  car.description = req.body.description;

  db.cars.push(car);
  return res.status(200).json({
    status: 201,
    data: {
      id: car.id,
      owner: car.owner,
      email: userEmail,
      created_on: car.created_on,
      state: car.state,
      status: car.status,
      price: car.price,
      manufacturer: car.manufacturer,
      model: car.model,
      body_type: car.body_type,
      transmission_type: car.transmission_type,
      image_url: car.image_url,
      description: car.description,
    },
  });
};

/**
 * view car ads by id
 * @param {object} req
 * @param {object} res
 */
const getACar = (req, res) => {
  const car = db.cars.find(data => data.id === req.params.id);
  if (!car) {
    return res.status(404).json({
      status: 404,
      message: 'Car not found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: car,
  });
};

/**
 * view all unsold cars
 * @param {object} req
 * @param {object} res
 */
const getUnsoldCars = (req, res, next) => {
  const { status, min_price, max_price } = req.query;
  const unsoldCars = db.cars.filter(car => car.status === status);
  if (min_price || max_price) {
    return next();
  }
  // eslint-disable-next-line eqeqeq
  if (unsoldCars == '') {
    return res.status(404).json({
      status: 404,
      message: 'cars not found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: unsoldCars,
  });
};


/**
 * view unsold cars within a price range
 * @param {object} req
 * @param {object} res
 */
const getUnsoldCarsByPrice = (req, res) => {
  const { status, min_price, max_price } = req.query;
  const max = max_price;
  const min = min_price;
  const unsoldCarsByPrice = db.cars.filter(car => car.status === status && car.price >= min && car.price <= max);
  // eslint-disable-next-line eqeqeq
  if (unsoldCarsByPrice == '') {
    return res.status(404).json({
      status: 404,
      message: 'cars not found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: unsoldCarsByPrice,
  });
};

const updateCarStatus = (req, res) => {
  const car = db.cars.find(data => data.id === req.params.id);
  if (!car) {
    return res.status(404).json({
      status: 404,
      message: 'Car not found',
    });
  }
  car.status = req.body.status;
  return res.status(200).json({
    status: 200,
    data: car,
  });
};

const carControl = {
  postCar,
  getACar,
  getUnsoldCars,
  getUnsoldCarsByPrice,
  updateCarStatus,
};

export default carControl;
