import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const token = (id, email, is_admin) => jwt.sign({
  id,
  email,
  is_admin,
}, secret, {
  expiresIn: '5h',
});

export default token;
