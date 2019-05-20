import jwt from 'jsonwebtoken';


const token = (id, email, is_admin) => jwt.sign({
  id,
  email,
  is_admin,
}, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

export default token;
