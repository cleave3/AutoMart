/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../index';

chai.use(chaiHttp);
chai.should();
let userToken;
let AdminToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'johnsmith@gmail.com',
      password: 'john12345',
    })
    .end((error, res) => {
      userToken = res.body.data.token;
      done();
    });
});

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'cleave@gmail.com',
      password: 'cleave12345',
    })
    .end((error, res) => {
      AdminToken = res.body.data.token;
      done();
    });
});

describe('API ENDPOINTS FOR CARS', () => {
  describe('POSTING A CAR AD', () => {
    it('should create a car ad when user is signed in', (done) => {
      const filePath = `${__dirname}/assets/nissan.jpeg`;
      chai.request(app)
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
        .field('description', 'nice new car')
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not create a car ad when user token is invalid', (done) => {
      chai.request(app)
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
        })
        .end((error, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not create a car ad when user is not signed in', (done) => {
      chai.request(app)
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
        })
        .end((error, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          done();
        });
    });
  });
  describe('VIEWING A SPECIFIC A CAR AD', () => {
    it('should view a specific car ad when id is accurate', (done) => {
      chai.request(app)
        .get('/api/v1/car/123')
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should not view a specific car ad when id is inaccurate', (done) => {
      chai.request(app)
        .get('/api/v1/car/fakeid')
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          done();
        });
    });
  });
//   describe('DELETING A SPECIFIC A CAR AD', () => {
//     it('should delete a specific car ad when id is accurate', (done) => {
//       chai.request(app)
//         .delete('/api/v1/car/125')
//         .set('x-access-token', AdminToken)
//         .end((error, res) => {
//           res.should.have.status(200);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not delete a specific car ad when id is inaccurate', (done) => {
//       chai.request(app)
//         .delete('/api/v1/car/fakeid')
//         .set('x-access-token', AdminToken)
//         .end((error, res) => {
//           res.should.have.status(404);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not delete a specific car ad when user is not an admin', (done) => {
//       chai.request(app)
//         .delete('/api/v1/car/125')
//         .set('x-access-token', userToken)
//         .end((error, res) => {
//           res.should.have.status(401);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not delete a specific car ad when admin is not signedin', (done) => {
//       chai.request(app)
//         .delete('/api/v1/car/125')
//         .end((error, res) => {
//           res.should.have.status(403);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not delete a specific car ad when id is inaccurate', (done) => {
//       chai.request(app)
//         .delete('/api/v1/car/125')
//         .set('x-access-token', 'invalid token')
//         .end((error, res) => {
//           res.should.have.status(401);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//   });
//   describe('UPDATE A SPECIFIC A CAR STATUS', () => {
//     it('should update a specific car status when user is signedin', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/124/status')
//         .set('x-access-token', userToken)
//         .send({
//           status: 'sold',
//         })
//         .end((error, res) => {
//           res.should.have.status(200);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not update a specific car status when user is signedin', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/124/status')
//         .send({
//           status: 'sold',
//         })
//         .end((error, res) => {
//           res.should.have.status(403);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not update a specific car status when car id is incorrect', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/fakeid/status')
//         .set('x-access-token', userToken)
//         .send({
//           status: 'sold',
//         })
//         .end((error, res) => {
//           res.should.have.status(404);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not update a specific car status when user token is invalid', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/124/status')
//         .set('x-access-token', 'invalid token')
//         .send({
//           status: 'sold',
//         })
//         .end((error, res) => {
//           res.should.have.status(401);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//   });
//   describe('UPDATE A SPECIFIC A CAR PRICE', () => {
//     it('should update a specific car price when user is signedin', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/124/price')
//         .set('x-access-token', userToken)
//         .send({
//           price: 1000000,
//         })
//         .end((error, res) => {
//           res.should.have.status(200);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not update a specific car price when user is signedin', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/124/price')
//         .send({
//           price: 1000000,
//         })
//         .end((error, res) => {
//           res.should.have.status(403);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not update a specific car price when car id is incorrect', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/fakeid/price')
//         .set('x-access-token', userToken)
//         .send({
//           price: 1000000,
//         })
//         .end((error, res) => {
//           res.should.have.status(404);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//     it('should not update a specific car price when user token is invalid', (done) => {
//       chai.request(app)
//         .patch('/api/v1/car/124/price')
//         .set('x-access-token', 'invalid token')
//         .send({
//           price: 1000000,
//         })
//         .end((error, res) => {
//           res.should.have.status(401);
//           res.body.should.be.an('object');
//           done();
//         });
//     });
//   });
  describe('GET CARS', () => {
    // it('should get all cars if user is signed in as admin', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/car')
    //     .set('x-access-token', AdminToken)
    //     .end((error, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.an('object');
    //       done();
    //     });
    // });
    it('should view all available cars', (done) => {
      chai.request(app)
        .get('/api/v1/car')
        .set('x-access-token', AdminToken)
        .query({
          status: 'available',
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
    // it('should view all available cars within a price range', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/car')
    //     .set('x-access-token', AdminToken)
    //     .query({
    //       status: 'available',
    //       min_price: 0,
    //       max_price: 3000000000,
    //     })
    //     .end((error, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.an('object');
    //       done();
    //     });
    // });
    // it('should not view all available cars within a price range', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/car')
    //     .set('x-access-token', AdminToken)
    //     .query({
    //       status: 'available',
    //       min_price: '',
    //       max_price: 1,
    //     })
    //     .end((error, res) => {
    //       res.should.have.status(404);
    //       res.body.should.be.an('object');
    //       done();
    //     });
    // });
    // it('should not view all available cars within a price range', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/car')
    //     .set('x-access-token', AdminToken)
    //     .query({
    //       status: 'available',
    //       min_price: 0,
    //       max_price: '',
    //     })
    //     .end((error, res) => {
    //       res.should.have.status(404);
    //       res.body.should.be.an('object');
    //       done();
    //     });
    // });
  });
});
