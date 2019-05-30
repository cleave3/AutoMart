/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

// eslint-disable-next-line consistent-return
const verifyAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({
      status: 403,
      message: 'authentication failed, please login',
    });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const { is_admin } = decoded;
    if (is_admin) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      message: 'authentication failed, please login as Admin',
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'authentication failed',
    });
  }
};

export default verifyAdmin;
