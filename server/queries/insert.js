const insert = {
  userSignup: 'INSERT INTO users (user_id, first_name, last_name, address, email, password, is_admin) VALUES ($1, $2, $3, $4,$5,$6,$7) returning *',
};
export default insert;
