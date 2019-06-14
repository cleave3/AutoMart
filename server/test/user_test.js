/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('API ENDPOINTS FOR USERS', () => {
  it('should get all route', (done) => {
    chai.request(app)
      .get('/')
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should not register a user when all required fields are empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when only first name are provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when only first and last name are provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when email is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: '',
        password: '',
        confirmPassword: '',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when password is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '',
        confirmPassword: '',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when confirmation password is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '123345678',
        confirmPassword: '',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when paswword and confirmation password does not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '12345678',
        confirmPassword: '12347865',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when password is less than 8 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '123345',
        confirmPassword: '12345',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when a valid email is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroromail.com',
        password: '123345678',
        confirmPassword: '12345678',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when first name is less than three characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'co',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '123345678',
        confirmPassword: '12345678',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when last name is less than three characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'ow',
        address: 'warri, nigeria',
        email: 'owhiroro@mail.com',
        password: '123345678',
        confirmPassword: '12345678',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not register a user when the email belongs to another user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'cleave@gmail.com',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((error, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should register a user when all required fields are completed accurately', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'cleave',
        last_name: 'owhiroro',
        address: 'warri, nigeria',
        email: 'realdude@gmail.com',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((error, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.data.should.have.property('token');
        done();
      });
  });
});
describe('USER SIGNIN', () => {
  it('should not signin a user when all required fields are empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: '',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not signin a user when a valid mail is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'johnmail.com',
        password: '12345678',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not signin a user when a valid password is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'john@mail.com',
        password: '123',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not signin a user when incorrect email is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'john@mail.com',
        password: '123345678',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not signin a user when incorrect password is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'cleave@gmail.com',
        password: '123345678',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not signin a user when incorrect details are provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'john@mail.com',
        password: '123345678',
      })
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should signin a user when all required fields completed accurately', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'cleave@gmail.com',
        password: 'cleave12345',
      })
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.have.property('token');
        done();
      });
  });
});
