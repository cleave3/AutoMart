/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const token = (user_id, email, first_name, last_name, is_admin) => jwt.sign({
  user_id,
  email,
  first_name, 
  last_name,
  is_admin,
}, secret, {
  expiresIn: '5h',
});

export default token;
