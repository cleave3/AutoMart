/* eslint-disable camelcase */
import shortid from 'shortid';
import db from '../database/db';
import insert from '../queries/insert';
import find from '../queries/find';
import update from '../queries/update';
import remove from '../queries/delete';

const { createAds } = insert;
const {
  findById, findAllByStatus, findAllByStatusAndPrice, findAllCars, findUserAds,
  findByManufacturer,
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
  let image_url;
  if (!req.file) {
    image_url = null;
  } else {
    const { secure_url } = req.file;
    image_url = secure_url;
  }
  try {
    const values = [carId, owner, state, status, price, manufacturer, model, body_type, transmission_type, image_url, description];
    await db.query(createAds, values);
    return res.status(201).json({
      status: 201,
      data: {
        id: carId,
        owner,
        email,
        created_on: new Date(),
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
      error: 'Oops ! something went wrong',
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
  const {
    status, min_price, max_price, manufacturer,
  } = req.query;
  try {
    if (status || min_price || max_price || manufacturer) {
      return next();
    }
    const allCars = await db.query(findAllCars);
    return res.status(200).json({
      status: 200,
      data: allCars.rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
};


/**
 * View a specific car Ad
 * @param {params} req
 * @param {object} res
 */
const getACar = async (req, res) => {
  const car_id = [req.params.id];
  try {
    const desiredCar = await db.query(findById, car_id);
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
};

/**
 *View all unsold cars
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const getUnsoldCars = async (req, res, next) => {
  const {
    status, min_price, max_price, manufacturer,
  } = req.query;
  if (min_price || max_price || !status || manufacturer) {
    return next();
  }
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
};

/**
 *View available cars within a price range
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
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
};

/**
 *View available cars of a specific make
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const getUnsoldCarsByManufacturer = async (req, res, next) => {
  const { manufacturer } = req.query;
  if (!manufacturer) {
    return next();
  }
  const value = [manufacturer];
  try {
    const carsByMake = await db.query(findByManufacturer, value);
    if (carsByMake.rows < 1) {
      return res.status(404).json({
        status: 404,
        error: 'No car found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: carsByMake.rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
};

/**
 * update car status
 * @param {object} req
 * @param {object} res
 */
const updateCarStatus = async (req, res) => {
  const { email, user_id } = req.decoded;
  try {
    const desiredCar = await db.query(findById, [req.params.id]);
    const { owner, status } = desiredCar.rows[0];
    if (user_id !== owner) {
      return res.status(403).json({
        status: 403,
        error: 'Unathorized operation, car belongs to another user',
      });
    };
    if ( status === 'sold') {
      return res.status(409).json({
        status: 409,
        error: 'Can not update, car already sold'
      })
    }
    await db.query(updateStatus, [req.params.id]);
    const updatedCar = await db.query(findById, [req.params.id]);
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
  } catch (error) {
    return res.status(404).json({
      status: 404,
      error: 'Car with given id not found',
    });
  }
};

/**
 * Update car price
 * @param {object} req
 * @param {object} res
 */
const updateCarPrice = async (req, res) => {
  const { price } = req.body;
  const { email } = req.decoded;
  try {
    const desiredCar = await db.query(findById, [req.params.id]);
    const car = desiredCar.rows[0];
    const values = [price, req.params.id];
    if (!car) {
      return res.status(404).json({
        status: 404,
        error: 'Car with given id not found',
      });
    }
    await db.query(updatePrice, values);
    const updatedCar = await db.query(findById, [req.params.id]);
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
};

/**
 * Delete an Ad
 * @param {object} req
 * @param {object} res
 */
const deleteCarAd = async (req, res) => {
  try {
    const desiredCar = await db.query(findById, [req.params.id]);
    const car = desiredCar.rows[0];
    if (!car) {
      return res.status(404).json({
        status: 404,
        error: 'car with the given id not found',
      });
    }
    await db.query(deleteCar, [req.params.id]);
    return res.json({
      status: 200,
      data: 'Car Ad successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
};

/**
 * get user orders
 * @param {object} req
 * @param {object} res
 */
const getCarsByUser = async (req, res) => {
  const { user_id } = req.decoded;
  const owner = user_id;
  const userAds = await db.query(findUserAds, [owner]);
  const cars = userAds.rows;
  if (cars < 1) {
    return res.status(404).json({
      status: 404,
      error: 'You are yet to post an AD',
    });
  }
  return res.status(200).json({
    status: 200,
    data: cars,
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
  getCarsByUser,
  getUnsoldCarsByManufacturer,
};

export default carControl;
