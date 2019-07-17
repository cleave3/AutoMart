/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('API ENDPOINTS FOR USERS', () => {
  it('should get all route', async () => {
    const res = await chai.request(app)
      .get('/');
    res.should.have.status(200);
  });
  it('should get swagger documentation', async () => {
    const res = await chai.request(app)
      .get('/api-docs');
    res.should.have.status(200);
  });
  it('should not register a user when all required fields are empty', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        password: '',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when only first name are provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: '',
        address: '',
        email: '',
        password: '',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when only first and last name are provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: '',
        email: '',
        password: '',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when email is not provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: '',
        password: '',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when password is not provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when a valid email is not provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroromail.com',
        password: '123345678',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when first name is less than three characters', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'co',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '123345678',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when last name is less than three characters', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'ow',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '123345678',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not register a user when the email belongs to another user', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'cleave@gmail.com',
        password: '12345678',
      });
    res.should.have.status(409);
    res.body.should.be.an('object');
  });
  it('should register a user when all required fields are completed accurately', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'realdude@gmail.com',
        password: '12345678',
      });
    res.should.have.status(201);
    res.body.should.be.an('object');
    res.body.data.should.have.property('token');
  });
});
describe('USER SIGNIN', () => {
  it('should not signin a user when all required fields are empty', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: '',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not signin a user when a valid mail is not provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'johnmail.com',
        password: '12345678',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not signin a user when a valid password is not provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'john@mail.com',
        password: '123',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not signin a user when incorrect email is provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'john@mail.com',
        password: '123345678',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not signin a user when incorrect password is provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'cleave@gmail.com',
        password: '123345678',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should not signin a user when incorrect details are provided', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'john@mail.com',
        password: '123345678',
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('should signin a user when all required fields completed accurately', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'cleave@gmail.com',
        password: 'cleave12345',
      });
    res.should.have.status(200);
    res.body.should.be.an('object');
    res.body.data.should.have.property('token');
  });
});
