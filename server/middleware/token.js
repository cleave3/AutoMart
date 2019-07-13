/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

class Auth {
  static createToken(user_id, email, first_name, last_name, is_admin) {
    const token = jwt.sign(
      {
        user_id,
        email,
        first_name,
        last_name,
        is_admin,
      },
      secret,
      { expiresIn: '24h' },
    );

    return token;
  }
}

export default Auth;
