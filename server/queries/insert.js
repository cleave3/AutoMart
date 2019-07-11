const insert = {
  userSignup: 'INSERT INTO users (user_id, first_name, last_name, address, email, password, is_admin) VALUES ($1, $2, $3, $4,$5,$6,$7) returning *',
  createAds: 'INSERT INTO cars (car_id, owner, state, status, price, manufacturer, model, body_type, transmission_type, image_url, description) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11) returning *',
  createOrders: 'INSERT INTO orders (order_id, buyer, car_id, amount, price_offered, status) VALUES ($1, $2, $3, $4, $5, $6)',
};
export default insert;
