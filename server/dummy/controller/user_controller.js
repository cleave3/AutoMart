import db from '../db/db';
import User from '../models/user_models';


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
  const newUser = new User();
  newUser.id = db.users.length + 1;
  newUser.first_name = req.body.first_name;
  newUser.last_name = req.body.last_name;
  newUser.address = req.body.address;
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  newUser.is_admin = false;

  db.users.push(newUser);
  return res.json({
    status: 201,
    data: newUser,
  });
};


const usersControl = {
  signup,
};

export default usersControl;
