const find = {
  findByEmail: 'SELECT * FROM users WHERE email = $1',
  findById: 'SELECT * FROM cars WHERE car_id = $1 LIMIT 1',
};

export default find;
