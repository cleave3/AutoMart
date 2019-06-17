/* eslint-disable camelcase */
import shortid from 'shortid';
import db from '../database/db';
import insert from '../queries/insert';
import find from '../queries/find';

const { createOrders } = insert;
const { findById } = find;

/**
 * Post an order
 * @param {object} req
 * @param {object} res
 */
const makeOrder = async (req, res) => {
  const { user_id } = req.decoded;
  const { carId } = req.body;
  const desiredCar = await db.query(findById, [carId]);
  const car = desiredCar.rows[0];
  const { car_id, price } = car;
  const orderId = shortid.generate();
  const buyer = user_id;
  const price_offered = price;
  const status = 'pending';
  const values = [orderId, buyer, car_id, price, price_offered, status];

  if (!car) {
    return res.status(404).json({
      status: 404,
      message: 'car not found',
    });
  }
  await db.query(createOrders, values);
  return res.status(200).json({
    status: 201,
    data: {
      id: orderId,
      car_id: carId,
      created_on: new Date(),
      status,
      price,
      price_offered: price,
    },
  });
};

const orderControl = {
  makeOrder,
};

export default orderControl;
