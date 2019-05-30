/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

let userToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'cleave@gmail.com',
      password: 'cleave12345',
    })
    .end((error, res) => {
      if (error) done(error);
      userToken = res.body.data.Token;
      done();
    });
});

describe('API ENDPOINTS FOR ORDERS', () => {
  describe('POST AN ORDER', () => {
    it('should create an order', (done) => {
      chai.request(app)
        .post('/api/v1/order')
        .set('x-access-token', userToken)
        .send({
          id: '123',
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not create an order when the given car id is unavailable', (done) => {
      chai.request(app)
        .post('/api/v1/order')
        .set('x-access-token', userToken)
        .send({
          id: 'fakeid',
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not create an order when no token is recieved', (done) => {
      chai.request(app)
        .post('/api/v1/order')
        .send({
          id: '123',
        })
        .end((error, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not create an order when token is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/order')
        .set('x-access-token', 'invalid token')
        .send({
          id: '123',
        })
        .end((error, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          done();
        });
    });
  });
  describe('UPDATE ORDER PRICE', () => {
    it('should update an order', (done) => {
      chai.request(app)
        .post('/api/v1/order/123/price')
        .set('x-access-token', userToken)
        .send({
          price_offered: 25000000,
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not update an order when order with given id is not found', (done) => {
      chai.request(app)
        .post('/api/v1/order/fakeid/price')
        .set('x-access-token', userToken)
        .send({
          price_offered: 25000000,
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not update an order when token is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/order/123/price')
        .set('x-access-token', 'invalid token')
        .send({
          price_offered: 25000000,
        })
        .end((error, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          done();
        });
    });
  });
  describe('GET USER ORDERS', () => {
    it('should get all orders of a specific user', (done) => {
      chai.request(app)
        .get('/api/v1/order/buyer/1')
        .set('x-access-token', userToken)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not get orders of a specific user when buyer id is incorrect', (done) => {
      chai.request(app)
        .get('/api/v1/order/buyer/fakeid')
        .set('x-access-token', userToken)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});
