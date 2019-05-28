import bcrypt from 'bcrypt';

const cp = bcrypt.hashSync('cleave12345', 10);
const jp = bcrypt.hashSync('john12345', 10);

export default {
  users: [
    {
      id: 1,
      first_name: 'cleave',
      last_name: 'owhiroro',
      address: 'warri, delta state',
      email: 'cleave@gmail.com',
      password: cp,
      is_admin: true,
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'smith',
      address: 'lagos',
      email: 'johnsmith@gmail.com',
      password: jp,
      is_admin: false,
    },
  ],
};
