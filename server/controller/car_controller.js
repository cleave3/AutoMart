/* eslint-disable camelcase */
import shortid from 'shortid';
import db from '../database/db';
import insert from '../queries/insert';
import find from '../queries/find';

const { createAds } = insert;
const { findById } = find;

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
      error: 'Oops ! Please ensure an image is selected',
    });
  }
};

/**
 *
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
      message: 'car not found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: car,
  });
};

const carControl = {
  postCar,
  getACar,
};

export default carControl;
