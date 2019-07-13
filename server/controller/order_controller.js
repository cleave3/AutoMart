/* eslint-disable camelcase */
import shortid from 'shortid';
import db from '../database/db';
import insert from '../queries/insert';
import find from '../queries/find';
import update from '../queries/update';

const { createOrders } = insert;
const { findById, findOrders, findUserOrders } = find;
const { updateOffer } = update;

/**
 * Make an order
 * @param {object} req
 * @param {object} res
 */
const makeOrder = async (req, res) => {
  const { user_id } = req.decoded;
  // const { car_id } = req.body;
  try {
    const desiredCar = await db.query(findById, [req.body.car_id]);
    const car = desiredCar.rows[0];
    const { car_id, price } = car;
    const order_id = shortid.generate();
    const buyer = user_id;
    const price_offered = price;
    const status = 'pending';
    const values = [order_id, buyer, car_id, price, price_offered, status];

    await db.query(createOrders, values);
    return res.status(200).json({
      status: 201,
      data: {
        id: order_id,
        car_id,
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
  // const order_id = req.params.id;
  const { price } = req.body;
  const values = [price, req.params.id];
  try {
    const order = await db.query(findOrders, [req.params.id]);
    const {
      order_id, car_id, status, amount,
    } = order.rows[0];
    if (status !== 'pending') {
      return res.status(400).json({
        status: 400,
        error: `Can't update offer. Order has been ${status}`,
      });
    }
    await db.query(updateOffer, values);
    return res.status(200).json({
      status: 200,
      data: {
        order_id,
        car_id,
        status,
        old_price_offered: amount,
        new_price_offered: price,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      error: 'Order with given id not found',
    });
  }
};

/**
 * get user orders
 * @param {object} req
 * @param {object} res
 */
const getOrdersByUser = async (req, res) => {
  const { user_id } = req.decoded;
  const userId = user_id;
  const userOrders = await db.query(findUserOrders, [userId]);
  const orders = userOrders.rows;
  if (orders < 1) {
    return res.status(404).json({
      status: 404,
      error: 'user is yet to make an order',
    });
  }
  return res.status(200).json({
    status: 200,
    data: orders,
  });
};

const orderControl = {
  makeOrder,
  updateOrderPrice,
  getOrdersByUser,
};

export default orderControl;
