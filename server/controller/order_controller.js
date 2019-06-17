/* eslint-disable camelcase */
import shortid from 'shortid';
import db from '../database/db';
import insert from '../queries/insert';
import find from '../queries/find';
import update from '../queries/update';

const { createOrders } = insert;
const { findById, findOrders } = find;
const { updateOffer } = update;

/**
 * Post an order
 * @param {object} req
 * @param {object} res
 */
const makeOrder = async (req, res) => {
  const { user_id } = req.decoded;
  const { carId } = req.body;
  try {
    const desiredCar = await db.query(findById, [carId]);
    const car = desiredCar.rows[0];
    const { car_id, price } = car;
    const orderId = shortid.generate();
    const buyer = user_id;
    const price_offered = price;
    const status = 'pending';
    const values = [orderId, buyer, car_id, price, price_offered, status];

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
  } catch (error) {
    return res.status(404).json({
      status: 404,
      error: 'car not found',
    });
  }
};

/**
 * update price offered
 * @param {object} req
 * @param {object} res
 */
const updateOrderPrice = async (req, res) => {
  const orderId = req.params.id;
  const { offer } = req.body;
  const values = [offer, orderId];
  try {
    const order = await db.query(findOrders, [orderId]);
    const {
      order_id, car_id, status, amount,
    } = order.rows[0];

    await db.query(updateOffer, values);
    return res.status(200).json({
      status: 200,
      data: {
        order_id,
        car_id,
        status,
        old_price_offered: amount,
        new_price_offered: offer,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      error: 'Order with given id not found',
    });
  }
};

const orderControl = {
  makeOrder,
  updateOrderPrice,
};

export default orderControl;
