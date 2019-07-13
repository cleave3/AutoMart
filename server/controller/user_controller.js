/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import insert from '../queries/insert';
import find from '../queries/find';
import db from '../database/db';
import Token from '../middleware/token';

const { userSignup } = insert;
const { findByEmail } = find;

/**
 *
 * @param {object} req
 * @param {object} res
 */
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
        is_admin,
      },
    });
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(409).send({
        status: 409,
        error: 'Email is associated with another user account',
      });
    }
    return res.status(400).send(error);
  }
};

/**
 *
 * @param {object} req
 * @param {object} res
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = [email];
  try {
    const user = await db.query(findByEmail, userEmail);
    const {
      user_id, first_name, last_name, is_admin,
    } = user.rows[0];

    if (user.rows[0]) {
      const correctPassword = await bcrypt.compareSync(password, user.rows[0].password);

      if (!correctPassword) {
        return res.status(400).json({
          error: 'password incorrect',
        });
      }
      const token = await Token(user_id, email, first_name, last_name, is_admin);
      return res.status(200).json({
        status: 200,
        data: {
          token,
          user_id,
          first_name,
          last_name,
          email,
          is_admin,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Email does not match any user account',
    });
  }
};

const userControl = {
  signup,
  login,
};

export default userControl;
