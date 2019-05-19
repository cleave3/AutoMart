/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import db from '../db/db';
import User from '../models/user_models';
import token from '../../helpers/token';

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

  db.users.push(newUser);
  return res.status(200).json({
    status: 201,
    data: newUser,
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
    return res.status(401).json({
      status: 401,
      message: 'Email or Password Incorrect',
    });
  }
  bcrypt.compare(req.body.password, user.password, (error, result) => {
    if (error) {
      return res.status(401).json({
        status: 401,
        message: 'Email or Password Incorrect',
      });
    }
    if (result) {
      const Token = token(
        user.id,
        user.email,
      );
      return res.status(200).json({
        status: 200,
        data: {
          Token,
          id: user.id,
          firstname: user.first_name,
          lastname: user.last_name,
          email: user.email,
          isadmin: user.is_admin,
        },
      });
    }
    return res.status(401).json({
      status: 401,
      message: 'Email or Password Incorrect',
    });
  });
};

const usersControl = {
  signup,
  login,
};

export default usersControl;
