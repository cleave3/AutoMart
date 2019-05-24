import shortid from 'shortid';

export default {
  users: [
    {
      id: 1,
      first_name: 'cleave',
      last_name: 'owhiroro',
      address: 'warri, delta state',
      email: 'cleave@gmail.com',
      password: 'cleave',
      is_admin: true,
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'smith',
      address: 'lagos',
      email: 'johnsmith@gmail.com',
      password: 'john',
      is_admin: false,
    },
  ],
  cars: [
    {
      id: shortid.generate(),
      owner: 1,
      created_on: new Date(),
      state: 'used',
      status: 'available',
      price: '2500000',
      manufacturer: 'toyota',
      model: 'camry',
      body_type: 'car',
      transmission_type: 'automatic',
      image: '',
      description: 'Fairly used toyota camry with auto transmission',
    },
    {
      id: shortid.generate(),
      owner: 2,
      created_on: new Date(),
      state: 'New',
      status: 'available',
      price: '5500000',
      manufacturer: 'Mercedez',
      model: 'GLK',
      body_type: 'car',
      transmission_type: 'automatic',
      image: '',
      description: ' Brand new Benz GLK with latest functionalities',
    },
  ],
};