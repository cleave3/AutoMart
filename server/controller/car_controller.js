/* eslint-disable camelcase */
import shortid from 'shortid';
import db from '../database/db';
import insert from '../queries/insert';
import find from '../queries/find';
import update from '../queries/update';
import remove from '../queries/delete';

const { createAds } = insert;
const {
  findById, findAllByStatus, findAllByStatusAndPrice, findAllCars,
} = find;
const { updateStatus, updatePrice } = update;
const { deleteCar } = remove;

/**
 * create a car Ad
 * @param {object} req
 * @param {object} res
 */
const postCar = async (req, res) => {
  const {
    state, price, manufacturer, model, body_type, transmission_type, description,
  } = req.body;
  const { user_id, email } = req.decoded;
  const carId = shortid.generate();
  const status = 'available';
  const owner = user_id;

  try {
    const { secure_url } = req.file;
    const image_url = secure_url;
    const values = [carId, owner, state, status, price, manufacturer, model, body_type, transmission_type, image_url, description];
    await db.query(createAds, values);
    res.status(201).json({
      status: 201,
      data: {
        car_id: carId,
        owner,
        email,
        state,
        status,
        price,
        manufacturer,
        model,
        body_type,
        transmission_type,
        image_url,
        description,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Oops ! Please select an image',
    });
  }
};

/**
 *View all cars
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const getAllCars = async (req, res, next) => {
  const { status, min_price, max_price } = req.query;
  if (status || min_price || max_price) {
    return next();
  }
  const allCars = await db.query(findAllCars);
  return res.status(200).json({
    status: 200,
    data: allCars.rows,
  });
};


/**
 * View a specific car Ad
 * @param {params} req
 * @param {object} res
 */
const getACar = async (req, res) => {
  const carId = [req.params.id];
  const desiredCar = await db.query(findById, carId);
  const car = desiredCar.rows[0];
  if (!car) {
    return res.status(404).json({
      status: 404,
      error: 'car not found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: car,
  });
};

/**
 *View all unsold cars
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const getUnsoldCars = async (req, res, next) => {
  const { status, min_price, max_price } = req.query;
  if (min_price || max_price || !status) {
    return next();
  }
  const unsoldCars = await db.query(findAllByStatus);
  if (unsoldCars.rows < 1) {
    return res.status(404).json({
      status: 404,
      error: 'cars not found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: unsoldCars.rows,
  });
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const getUnsoldCarsByPrice = async (req, res, next) => {
  const { min_price, max_price } = req.query;
  if (!min_price || !max_price) {
    return next();
  }
  const values = [min_price, max_price];
  const unsoldCarsByPrice = await db.query(findAllByStatusAndPrice, values);
  if (unsoldCarsByPrice.rows < 1) {
    return res.status(404).json({
      status: 404,
      error: 'No car found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: unsoldCarsByPrice.rows,
  });
};

/**
 * update car status
 * @param {object} req
 * @param {object} res
 */
const updateCarStatus = async (req, res) => {
  const { status } = req.body;
  const { email } = req.decoded;
  const carId = req.params.id;
  const desiredCar = await db.query(findById, [carId]);
  const car = desiredCar.rows[0];
  const values = [status, carId];
  if (!car) {
    return res.status(404).json({
      status: 404,
      error: 'Car with given id not found',
    });
  }
  await db.query(updateStatus, values);
  const updatedCar = await db.query(findById, [carId]);
  const data = updatedCar.rows[0];
  return res.status(200).json({
    status: 200,
    data: {
      id: data.car_id,
      email,
      created_on: data.created_on,
      state: data.state,
      status: data.status,
      price: data.price,
      manufacturer: data.manufacturer,
      model: data.model,
      body_type: data.body_type,
    },
  });
};

const updateCarPrice = async (req, res) => {
  const { price } = req.body;
  const { email } = req.decoded;
  const carId = req.params.id;
  const desiredCar = await db.query(findById, [carId]);
  const car = desiredCar.rows[0];
  const values = [price, carId];
  if (!car) {
    return res.status(404).json({
      status: 404,
      error: 'Car with given id not found',
    });
  }
  await db.query(updatePrice, values);
  const updatedCar = await db.query(findById, [carId]);
  const data = updatedCar.rows[0];
  return res.status(200).json({
    status: 200,
    data: {
      car_id: data.id,
      email,
      created_on: data.created_on,
      state: data.state,
      status: data.status,
      price: data.price,
      manufacturer: data.manufacturer,
      model: data.model,
      body_type: data.body_type,
    },
  });
};

/**
 * Delete an ad
 * @param {object} req
 * @param {object} res
 */
const deleteCarAd = async (req, res) => {
  const carId = req.params.id;
  const desiredCar = await db.query(findById, [carId]);
  const car = desiredCar.rows[0];
  if (!car) {
    return res.status(404).json({
      status: 404,
      error: 'car with the given id not found',
    });
  }
  await db.query(deleteCar, [carId]);
  return res.json({
    status: 200,
    data: 'Car Ad successfully deleted',
  });
};

const carControl = {
  postCar,
  getAllCars,
  getACar,
  getUnsoldCars,
  getUnsoldCarsByPrice,
  updateCarStatus,
  updateCarPrice,
  deleteCarAd,
};

export default carControl;
