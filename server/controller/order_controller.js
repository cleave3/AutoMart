// /* eslint-disable camelcase */
// import shortid from 'shortid';
// import db from '../database/db';
// import insert from '../queries/insert';
// import find from '../queries/find';
// import update from '../queries/update';

// const { createOrders } = insert;
// const { findById, findOrders, findUserOrders } = find;
// const { updateOffer } = update;
// /**
//  * Post an order
//  * @param {object} req
//  * @param {object} res
//  */
// const makeOrder = async (req, res) => {
//   const { user_id } = req.decoded;
//   const carId = [req.body.carId];
//   const desiredCar = await db.query(findById, carId);
//   const car = desiredCar.rows[0];
//   const { car_id, price } = car;

//   if (!car) {
//     return res.status(404).json({
//       status: 404,
//       message: 'car not found',
//     });
//   }

//   const orderId = shortid.generate();
//   const buyer = user_id;
//   const amount = price;
//   const price_offered = price;
//   const status = 'pending';
//   const values = [orderId, buyer, car_id, amount, price_offered, status];

//   await db.query(createOrders, values);

//   const order = await db.query(findOrders, [orderId]);
//   return res.status(200).json({
//     status: 201,
//     data: order.rows,
//   });
// };

// /**
//  * update price offered
//  * @param {object} req
//  * @param {object} res
//  */
// const updateOrderPrice = async (req, res) => {
//   const orderId = req.params.id;
//   const { offer } = req.body;
//   const order = await db.query(findOrders, [orderId]);
//   const myOrder = order.rows[0];
//   if (!myOrder) {
//     return res.status(404).json({
//       status: 404,
//       message: 'Order with given id not found',
//     });
//   }
//   const values = [offer, orderId];
//   await db.query(updateOffer, values);
//   const updatedOrder = await db.query(findOrders, [orderId]);
//   const {
//     id, car_id, created_on, status, amount, price_offered,
//   } = updatedOrder.rows[0];
//   return res.status(200).json({
//     status: 200,
//     data: {
//       id,
//       car_id,
//       created_on,
//       status,
//       old_price_offered: amount,
//       new_price_offered: price_offered,
//     },
//   });
// };

// /**
//  * get user orders
//  * @param {object} req
//  * @param {object} res
//  */
// const getOrdersByUser = async (req, res) => {
//   const { user_id } = req.decoded;
//   const userId = user_id;
//   const userOrders = await db.query(findUserOrders, [userId]);
//   const orders = userOrders.rows;
//   if (orders < 1) {
//     return res.status(404).json({
//       status: 404,
//       message: 'user is yet to make an order',
//     });
//   }
//   return res.status(200).json({
//     status: 200,
//     data: orders,
//   });
// };
// const orderControl = {
//   makeOrder,
//   updateOrderPrice,
//   getOrdersByUser,
// };

// export default orderControl;
