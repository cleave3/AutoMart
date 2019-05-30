/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import db from '../db/user_db';
import User from '../models/user_models';
import token from '../../middleware/token';

/**
 *user signup
 * @param {*} req
 * @param {json} res
 */
const signup = (req, res) => {
  const same = db.users.find(user => user.email === req.body.email);
  if (same) {
    return res.status(409).json({
      status: 409,
      message: 'Email is associated with another user account',
    });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User();
  newUser.id = db.users.length + 1;
  newUser.first_name = req.body.first_name;
  newUser.last_name = req.body.last_name;
  newUser.address = req.body.address;
  newUser.email = req.body.email;
  newUser.password = hashedPassword;
  newUser.is_admin = false;

  const Token = token(
    newUser.id,
    newUser.email,
    newUser.is_admin,
  );
  db.users.push(newUser);
  return res.status(200).json({
    status: 201,
    data: {
      Token,
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      address: newUser.address,
      email: newUser.email,
      password: newUser.password,
      is_admin: newUser.is_admin,
    },
  });
};

/**
 * user login
 * @param {*} req
 * @param {json} res
 */
const login = (req, res) => {
  const user = db.users.find(data => data.email === req.body.email);
  if (!user) {
    return res.status(400).json({
      status: 400,
      message: 'Email or Password Incorrect',
    });
  }
  bcrypt.compare(req.body.password, user.password, (error, result) => {
    if (result) {
      const Token = token(
        user.id,
        user.email,
        user.is_admin,
      );
      return res.status(200).json({
        status: 200,
        data: {
          Token,
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          is_admin: user.is_admin,
        },
      });
    }
    return res.status(400).json({
      status: 400,
      message: 'Email or Password Incorrect',
    });
  });
};

const passwordReset = (req, res) => {
  const user = db.users.find(data => data.email === req.body.email);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'Email does not exist',
    });
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  user.password = hashedPassword;
  return res.status(200).json({
    status: 200,
    message: 'Password reset successful',
  });
};
const usersControl = {
  signup,
  login,
  passwordReset,
};

export default usersControl;
