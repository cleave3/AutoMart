import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'autosecret';

const token = (id, email, is_admin) => jwt.sign({
  id,
  email,
  is_admin,
}, secret, {
  expiresIn: '1h',
});

export default token;
