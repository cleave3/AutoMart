import jwt from 'jsonwebtoken';


const token = (id, email) => jwt.sign({
  id,
  email,
}, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

export default token;
