/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

let userToken;

before(async () => {
  const res = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'cleave@gmail.com',
      password: 'cleave12345',
    });
  userToken = res.body.data.token;
});

describe('API ENDPOINTS FOR ORDERS', () => {
  describe('POST AN ORDER', () => {
    it('should create an order', async () => {
      const res = await chai.request(app)
        .post('/api/v1/order')
        .set('x-access-token', userToken)
        .send({
          car_id: '123',
        });
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should not create an order when no token is recieved', async () => {
      const res = await chai.request(app)
        .post('/api/v1/order')
        .send({
          car_id: '123',
        });
      res.should.have.status(403);
      res.body.should.be.an('object');
    });
    it('should not create an order when token is invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/order')
        .set('x-access-token', 'invalid token')
        .send({
          car_id: '123',
        });
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
  });
  describe('UPDATE ORDER PRICE', () => {
    it('should update an order', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/order/123/price')
        .set('x-access-token', userToken)
        .send({
          price: 25000000,
        });
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
    it('should not update an order when order with given id is not found', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/order/fakeid/price')
        .set('x-access-token', userToken)
        .send({
          price: 25000000,
        });
      res.should.have.status(404);
      res.body.should.be.an('object');
    });
    it('should not update an order when order is already accepted or rejected', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/order/133/price')
        .set('x-access-token', userToken)
        .send({
          price: 25000000,
        });
      res.should.have.status(400);
      res.body.should.be.an('object');
    });
    it('should not update an order when token is invalid', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/order/123/price')
        .set('x-access-token', 'invalid token')
        .send({
          price: 25000000,
        });
      res.should.have.status(401);
      res.body.should.be.an('object');
    });
  });
  describe('GET USER ORDERS', () => {
    it('should get all orders of a specific user', async () => {
      const res = await chai.request(app)
        .get('/api/v1/buyer/order')
        .set('x-access-token', userToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
    });
  });
});
