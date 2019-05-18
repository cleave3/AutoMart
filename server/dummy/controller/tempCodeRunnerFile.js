import db from '../db/db';
import User from '../models/user_models';
// import User from '../services/user_service';


// USER SIGNUP
const signup = (req, res) => {
  const same = db.users.find(data => data.email === req.body.email);
  if (same) {
    return res.status(409).json({
      status: 409,
      message: 'This user already exist',
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

const getUsers = (req, res) => {
  const users = db.users.map(allUsers => allUsers);
  console.log(users);
  if (users === '') {
    return res.json({
      status: 404,
      message: 'No meal was found',
    });
  }
  return res.json({
    status: 200,
    data: users,
  });
};

const usersControl = {
  signup,
  getUsers,
};

export default usersControl;
