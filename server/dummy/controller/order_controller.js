import shortid from 'shortid';
import db from '../db/order_db';
import Cars from '../db/car_db';
import Order from '../models/order_model';

/**
 * Post an order
 * @param {object} req
 * @param {object} res
 */
const makeOrder = (req, res) => {
  const desiredCar = Cars.cars.find(car => car.id === req.body.id);
  const { id } = req.decoded;
  if (!desiredCar) {
    return res.status(404).json({
      status: 404,
      error: 'car not available',
    });
  }
  const order = new Order();
  order.id = shortid.generate();
  order.buyer = id;
  order.car_id = desiredCar.id;
  order.created_on = new Date();
  order.amount = desiredCar.price;
  order.price_offered = desiredCar.price;
  order.status = 'pending';

  db.orders.push(order);
  return res.status(200).json({
    status: 201,
    data: order,
  });
};

/**
 * update price offered
 * @param {object} req
 * @param {object} res
 */
const updateOrderPrice = (req, res) => {
  const order = db.orders.find(data => data.id === req.params.id);
  if (!order) {
    return res.status(404).json({
      status: 404,
      error: 'Order with given id not found',
    });
  }
  order.price_offered = req.body.price_offered;
  return res.status(200).json({
    status: 200,
    data: {
      id: order.id,
      car_id: order.car_id,
      created_on: order.created_on,
      status: order.status,
      old_price_offered: order.amount,
      new_price_offered: order.price_offered,
    },
  });
};

/**
 * get user orders
 * @param {object} req
 * @param {object} res
 */
const getOrdersByUser = (req, res) => {
  const userOrders = db.orders.filter(order => order.buyer === Number(req.params.id));
  if (userOrders == '') {
    return res.status(404).json({
      status: 404,
      error: 'user is yet to make an order',
    });
  }
  return res.status(200).json({
    status: 200,
    data: userOrders,
  });
};
const orderControl = {
  makeOrder,
  updateOrderPrice,
  getOrdersByUser,
};

export default orderControl;
