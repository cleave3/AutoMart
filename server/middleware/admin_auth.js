/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

const verifyAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.body.token;
  try {
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'authentication failed, please login',
      });
    }
    const decoded = jwt.verify(token, secret);
    const { is_admin } = decoded;
    if (is_admin) {
      return next();
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'authentication failed',
    });
  }
};

export default verifyAdmin;
