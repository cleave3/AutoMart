/* eslint-disable semi */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import insert from '../queries/insert';
import db from '../database/db';
import Token from '../middleware/token';

const { userSignup } = insert;

const signup = async (req, res) => {
  const {
    first_name, last_name, address, email, password,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const is_admin = false;
  const user_id = uuidv4();
  const values = [user_id, first_name, last_name, address, email, hashedPassword, is_admin];

  try {
    await db.query(userSignup, values);
    const token = await Token(user_id, first_name, last_name, email, is_admin);
    return res.status(201).json({
      status: 201,
      data: {
        token,
        user_id,
        first_name,
        last_name,
        address,
        email,
        password,
        is_admin,
      },
    });
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(409).send({
        status: 409,
        message: 'Email is associated with another user account',
      });
    }
    return res.status(400).send(error);
  }
};

const userControl = {
  signup,
};

export default userControl;
