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
  const {
    first_name, last_name, address, email, password,
  } = req.body;
  const same = db.users.find(user => user.email === email);
  if (same) {
    return res.status(409).json({
      status: 409,
      message: 'Email is associated with another user account',
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User();
  newUser.id = db.users.length + 1;
  newUser.first_name = first_name;
  newUser.last_name = last_name;
  newUser.address = address;
  newUser.email = email;
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
  const { email, password } = req.body;
  const user = db.users.find(data => data.email === email);
  if (!user) {
    return res.status(400).json({
      status: 400,
      message: 'Email or Password Incorrect',
    });
  }
  bcrypt.compare(password, user.password, (error, result) => {
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

const usersControl = {
  signup,
  login,
};

export default usersControl;
