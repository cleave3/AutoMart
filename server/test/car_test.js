/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../index';

chai.use(chaiHttp);
chai.should();
let userToken;
let AdminToken;

before(async () => {
  const res = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'johnsmith@gmail.com',
      password: 'john12345',
    });
  userToken = res.body.data.token;
});

before(async () => {
  const res = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'cleave@gmail.com',
      password: 'cleave12345',
    });
  AdminToken = res.body.data.token;
});

describe('API ENDPOINTS FOR CARS', () => {
  describe('POSTING A CAR AD', () => {
    it('should create a car ad when user is signed in', async () => {
      const filePath = `${__dirname}/assets/nissan.jpeg`;
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('x-access-token', userToken)
        .type('form')
        .set('enctype', 'multipart/formdata')
        .attach('image', fs.readFileSync(filePath), 'nissan.jpeg')
        .field('state', 'new')
        .field('price', 2000000)
        .field('manufacturer', 'toyota')
        .field('model', 'camry')
        .field('body_type', 'car')
        .field('transmission_type', 'automatic')
        .field('description', 'nice new car');
      res.should.have.status(201);
      res.body.should.be.an('object');
    });
    it('should create a car ad when image is not uploaded and user is signed in', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('x-access-token', userToken)
        .type('form')
        .set('enctype', 'multipart/formdata')
        .field('state', 'new')
        .field('price', 2000000)
        .field('manufacturer', 'toyota')
        .field('model', 'camry')
        .field('body_type', 'car')
        .field('transmission_type', 'automatic')
        .field('description', 'nice new car');
      res.should.have.status(201);
      res.body.should.be.an('object');
    });
    it('should not create a car ad when user token is invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('x-access-token', 'invalid token')
        .send({
          state: 'new',
          price: 2000000,
          manufacturer: 'toyota',
          model: 'camry',
          body_type: 'car',
          transmission_type: 'automatic',
          image_url: 'google.com',
          description: 'nice new car',
        });
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
    it('should not create a car ad when user is not signed in', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .send({
          state: 'new',
          price: 2000000,
          manufacturer: 'toyota',
          model: 'camry',
          body_type: 'car',
          transmission_type: 'automatic',
          image_url: 'google.com',
          description: 'nice new car',
        });
      res.should.have.status(403);
      res.body.should.be.an('object');
    });
  });
  describe('VIEWING A SPECIFIC A CAR AD', () => {
    it('should view a specific car ad when id is accurate', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car/123')
        .set('x-access-token', userToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should not view a specific car ad when id is inaccurate', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car/fakeid')
        .set('x-access-token', userToken);
      res.should.have.status(404);
      res.body.should.be.an('object');
    });
  });
  describe('DELETING A SPECIFIC A CAR AD', () => {
    it('should delete a specific car ad when id is accurate', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/car/125')
        .set('x-access-token', AdminToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should not delete a specific car ad when id is inaccurate', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/car/fakeid')
        .set('x-access-token', AdminToken);
      res.should.have.status(404);
      res.body.should.be.an('object');
    });
    it('should not delete a specific car ad when user is not an admin', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/car/125')
        .set('x-access-token', userToken);
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
    it('should not delete a specific car ad when admin is not signedin', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/car/125');
      res.should.have.status(403);
      res.body.should.be.an('object');
    });
    it('should not delete a specific car ad when id is inaccurate', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/car/125')
        .set('x-access-token', 'invalid token');
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
  });
  describe('UPDATE A SPECIFIC A CAR STATUS', () => {
    it('should update a specific car status of a logged in user', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/status')
        .set('x-access-token', AdminToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should update a specific car status of a sold car', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/status')
        .set('x-access-token', AdminToken);
      res.should.have.status(409);
      res.body.should.be.an('object');
    });
    it('should not update a specific car status of another user', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/status')
        .set('x-access-token', userToken);
      res.should.have.status(403);
      res.body.should.be.an('object');
    });
    it('should not update a specific car status when user is not signedin', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/status');
      res.should.have.status(403);
      res.body.should.be.an('object');
    });
    it('should not update a specific car status when car id is incorrect', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/fakeid/status')
        .set('x-access-token', AdminToken);
      res.should.have.status(404);
      res.body.should.be.an('object');
    });
    it('should not update a specific car status when user token is invalid', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/status')
        .set('x-access-token', 'invalid token');
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
  });
  describe('UPDATE A SPECIFIC A CAR PRICE', () => {
    it('should update a specific car price when user is signedin', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/price')
        .set('x-access-token', userToken)
        .send({
          price: 1000000,
        });
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should not update a specific car price when user is signedin', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/price')
        .send({
          price: 1000000,
        });
      res.should.have.status(403);
      res.body.should.be.an('object');
    });
    it('should not update a specific car price when car id is incorrect', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/fakeid/price')
        .set('x-access-token', userToken)
        .send({
          price: 1000000,
        });
      res.should.have.status(404);
      res.body.should.be.an('object');
    });
    it('should not update a specific car price when user token is invalid', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/124/price')
        .set('x-access-token', 'invalid token')
        .send({
          price: 1000000,
        });
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
  });
  describe('GET CARS', () => {
    it('should view all cars if user is signed in as admin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', AdminToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should not view all cars when user token is invalid', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', 'invalid token');
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
    it('should not view all cars when Admin is not logged in', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car');
      res.should.have.status(403);
      res.body.should.be.an('object');
    });
    it('should view all available cars', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', AdminToken)
        .query({
          status: 'available',
        });
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should view all available cars of a specific make', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', AdminToken)
        .query({
          status: 'available',
          manufacturer: 'toyota',
        });
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should view all available cars within a price range', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', AdminToken)
        .query({
          status: 'available',
          min_price: 0,
          max_price: 3000000000,
        });
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should not view all available cars within a price range', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', AdminToken)
        .query({
          status: 'available',
          min_price: '',
          max_price: 1,
        });
      res.should.have.status(404);
      res.body.should.be.an('object');
    });
    it('should not view all available cars within a price range', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', AdminToken)
        .query({
          status: 'available',
          min_price: 0,
          max_price: '',
        });
      res.should.have.status(404);
      res.body.should.be.an('object');
    });
    it('should view all posted Ads of a specific user', async () => {
      const res = await chai.request(app)
        .get('/api/v1/owner/car')
        .set('x-access-token', AdminToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
  });
});
