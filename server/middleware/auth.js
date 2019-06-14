// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();
// const secret = process.env.JWT_SECRET;

// const verifyUser = (req, res, next) => {
//   const token = req.headers['x-access-token'];
//   if (!token) {
//     return res.status(403).json({
//       status: 403,
//       error: 'authentication failed, please login',
//     });
//   }
//   try {
//     const decoded = jwt.verify(token, secret);
//     if (decoded) {
//       req.decoded = decoded;
//       return next();
//     }
//   } catch (error) {
//     return res.status(401).json({
//       status: 401,
//       error: 'authentication failed, please login',
//     });
//   }
// };

// export default verifyUser;
