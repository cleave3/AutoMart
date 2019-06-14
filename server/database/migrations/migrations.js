import pool from '../db';


const createTables = () => {
  const tables = `
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    is_admin BOOLEAN
  );

  DROP TABLE IF EXISTS cars;

  CREATE TABLE cars (
    car_id VARCHAR PRIMARY KEY,
    owner UUID NOT NULL,
    created_on TIMESTAMP DEFAULT NOW(),
    state TEXT NOT NULL,
    status TEXT NOT NULL,
    price FLOAT NOT NULL,
    manufacturer TEXT NOT NULL,
    model VARCHAR NOT NULL,
    body_type TEXT NOT NULL,
    transmission_type TEXT NOT NULL,
    image_url VARCHAR NOT NULL,
    description TEXT NOT NULL
  );

  DROP TABLE IF EXISTS orders;

  CREATE TABLE orders (
    order_id VARCHAR PRIMARY KEY,
    buyer UUID NOT NULL,
    car_id VARCHAR NOT NULL,
    created_on TIMESTAMP DEFAULT NOW(),
    amount FLOAT NOT NULL,
    price_offered FLOAT NOT NULL,
    status TEXT NOT NULL
  );
  `;
  pool.query(tables)
    .then(() => {
      console.log('tables created sucessfully');
      pool.end();
    })
    .catch((error) => {
      console.log(error);
    });
};

createTables();
