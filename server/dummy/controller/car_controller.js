/* eslint-disable camelcase */
import shortid from 'shortid';
import db from '../db/car_db';
import Car from '../models/car_model';

/**
 * post a car ad
 * @param {object} req
 * @param {object} res
 */
const postCar = (req, res) => {
  const {
    state, price, manufacturer, model, body_type, transmission_type, description,
  } = req.body;

  try {
    const { id, email } = req.decoded;
    const { secure_url } = req.file;
    const car = new Car();
    car.id = shortid.generate();
    car.owner = id;
    car.created_on = new Date();
    car.state = state;
    car.status = 'available';
    car.price = price;
    car.manufacturer = manufacturer;
    car.model = model;
    car.body_type = body_type;
    car.transmission_type = transmission_type;
    car.image_url = secure_url;
    car.description = description;

    db.cars.push(car);
    return res.status(200).json({
      status: 201,
      data: {
        id: car.id,
        owner: car.owner,
        email,
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
  } catch (error) {
    return res.status(400).json({
      message: 'something went wrong. Please ensure an image is selected',
    });
  }
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
 *view all car ads
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const getAllCars = (req, res, next) => {
  const { status, min_price, max_price } = req.query;
  if (status || min_price || max_price) {
    return next();
  }
  const allCars = db.cars.map(cars => cars);
  if (allCars == '') {
    res.status(404).json({
      status: 404,
      message: 'No car found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: allCars,
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
  if (min_price || max_price || !status) {
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
const getUnsoldCarsByPrice = (req, res, next) => {
  const { status, min_price, max_price } = req.query;
  if (!min_price || !max_price) {
    return next();
  }
  const max = max_price;
  const min = min_price;
  const unsoldCarsByPrice = db.cars.filter(car => car.status === status && car.price >= min && car.price <= max);
  // eslint-disable-next-line eqeqeq
  if (unsoldCarsByPrice == '') {
    return res.status(404).json({
      status: 404,
      message: 'No car found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: unsoldCarsByPrice,
  });
};

/**
 * update car status
 * @param {object} req
 * @param {object} res
 */
const updateCarStatus = (req, res) => {
  const car = db.cars.find(data => data.id === req.params.id);
  if (!car) {
    return res.status(404).json({
      status: 404,
      message: 'Car with given id not found',
    });
  }
  car.status = req.body.status;
  return res.status(200).json({
    status: 200,
    data: car,
  });
};

/**
 * update car price
 * @param {object} req
 * @param {object} res
 */
const updateCarPrice = (req, res) => {
  const car = db.cars.find(data => data.id === req.params.id);
  if (!car) {
    return res.status(404).json({
      status: 404,
      message: 'Car with given id not found',
    });
  }
  car.price = req.body.price;
  return res.status(200).json({
    status: 200,
    data: car,
  });
};

/**
 * Delete an ad
 * @param {object} req
 * @param {object} res
 */
const deleteCar = (req, res) => {
  const car = db.cars.find(data => data.id === req.params.id);
  if (!car) {
    return res.status(404).json({
      status: 404,
      message: 'car with the given id not found',
    });
  }

  const index = db.cars.indexOf(car);
  db.cars.splice(index, 1);

  return res.json({
    status: 200,
    message: 'Car Ad successfully deleted',
  });
};


const carControl = {
  postCar,
  getACar,
  getAllCars,
  getUnsoldCars,
  getUnsoldCarsByPrice,
  updateCarStatus,
  updateCarPrice,
  deleteCar,
};

export default carControl;
