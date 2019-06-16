import pool from '../db';


const insertData = () => {
  const data = `
    TRUNCATE users;

  INSERT INTO users (
    user_id,
    first_name,
    last_name,
    address,
    email,
    password,
    is_admin
    ) 
    VALUES (
      'f1e65b71-443a-4682-b984-4cabecfcb5b8',
        'Cleave',
        'Owhiroro',
        'Warri, Nigeria',
        'cleave@gmail.com',
        '$2b$10$GkSG0.Pc0Nv.PzsonMHltuRvXcBHibfUudZ2a1RCLC8svxQRgdCke',
        'true'
      ),
      (
        'f1e65b71-443a-4683-b984-4cabecfcb5b8',
        'John',
        'Smith',
        'Lagos, Nigeria',
        'johnsmith@gmail.com',
        '$2b$10$KckxTbjutti4LPmSb4gOOObbn4fpBKsn4AfASQZqCjz3wFgxXLuKu',
        'false'
      );

    TRUNCATE cars;

  INSERT INTO cars (
    car_id,
    owner,
    state,
    status,
    price,
    manufacturer,
    model,
    body_type,
    transmission_type,
    image_url,
    description
    ) 
    VALUES (
        '123',
        'f1e65b71-443a-4682-b984-4cabecfcb5b8',
        'used',
        'available',
        2500000,
        'toyota',
        'camry',
        'car',
        'automatic',
        'https://res.cloudinary.com/dqxyecesu/image/upload/v1559811651/automart/u6c37dcds14ejr1pydxj.jpg',
        'Fairly used toyota camry with auto transmission'
      ),
      (
        '124',
        'f1e65b71-443a-4682-b984-4cabecfcb5b8',
        'New',
        'available',
        3000000,
        'Mercedez',
        'GLK',
        'car',
        'automatic',
        'https://res.cloudinary.com/dqxyecesu/image/upload/v1559811651/automart/u6c37dcds14ejr1pydxj.jpg',
        'Brand new Benz GLK with latest functionalities'
      ),
      (
       '125',
       'f1e65b71-443a-4682-b984-4cabecfcb5b8',
        'New',
        'sold',
        4500000,
        'ford',
        'ford express',
        'SUV',
        'automatic',
        'https://res.cloudinary.com/dqxyecesu/image/upload/v1559811651/automart/u6c37dcds14ejr1pydxj.jpg',
        'Brand new ford express with latest functionalities'
      );

    TRUNCATE orders;

  INSERT INTO orders (
    order_id,
    buyer,
    car_id,
    amount,
    price_offered,
    status
    ) 
    VALUES (
        '123',
        'f1e65b71-473a-4682-b184-4cabecfcb5b8',
        '3gt5096',
        3000000,
        2500000,
        'pending'
      ),
      (
        '143',
        'f1e65b71-443a-4682-b984-4babecfcb5b8',
        '5gt5096',
        2500000,
        2000000,
        'rejected'
      ),
      (
        '133',
        'f1e65b71-443a-4682-b984-4cabecfcb5b8',
        '4gt5096',
        4500000,
        2500000,
        'accepted'
      );
  `;
  pool.query(data)
    .then(() => {
      console.log('database seeded sucessfully');
      pool.end();
    });
};

insertData();
