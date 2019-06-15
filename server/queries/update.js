const update = {
  updateStatus: 'UPDATE cars SET status = $1 WHERE car_id = $2',
  updatePrice: 'UPDATE cars SET price = $1 WHERE car_id = $2',
};
export default update;
