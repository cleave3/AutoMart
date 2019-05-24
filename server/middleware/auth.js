import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(403).json({
      status: 403,
      message: 'authentication failed, please login',
    });
  }
  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      res.status(401).json({
        message: 'authentication failed, please login',
      });
    }
    req.decoded = decoded;
    return next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: 'authentication failed, please login',
    });
  }
};

export default verifyUser;
