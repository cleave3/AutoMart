const find = {
  findByEmail: 'SELECT * FROM users WHERE email = $1',
  findById: 'SELECT * FROM cars WHERE car_id = $1 LIMIT 1',
  findAllByStatus: 'SELECT * FROM cars WHERE status = \'\available\'',
  findAllByStatusAndPrice: 'SELECT * FROM cars WHERE status = \'\available\' AND price BETWEEN $1 AND $2 ORDER BY manufacturer',
  findAllCars: 'SELECT * FROM cars',
};

export default find;
