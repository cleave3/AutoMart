const update = {
  updateStatus: 'UPDATE cars SET status = \'\sold\' WHERE car_id = $1',
  updatePrice: 'UPDATE cars SET price = $1 WHERE car_id = $2',
  updateOffer: 'UPDATE orders SET price_offered = $1 WHERE order_id = $2',
};
export default update;
