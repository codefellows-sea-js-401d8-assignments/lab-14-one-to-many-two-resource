'use strict';

const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Order = require('../model/order');
const User = require('../model/user');

let server;
let port = 8000;
process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

let testOrder, testUser;

before((done) => {
  server = require('../_server').listen(port);

  User({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
  }).save()
    .then((data) => {
      testUser = data;
    });
  Order({
    orderDate: '2016-07-31',
    comment: 'Please ship everything at once',
    shippingMethod: 'Economy',
    status: 'Received',
    userId: null
  }).save()
    .then((data) => {
      testOrder = data;
      done();
    });

});

after((done) => {
  mongoose.connection.db.dropDatabase()
    .then(server.close())
    .then(() => {
      done();
    });
});

describe('The 404 error handling', () => {
  it('shoud return 404 page if an unknown url is used', (done) => {
    request('localhost:' + port)
      .get('/randomurl')
      .end((err, res) => {
        expect(err.message).to.eql('Not Found');
        expect(res.body.msg).to.eql('Not Found');
        done();
      });
  });
});

describe('The two-resource CRUD api', () => {
  describe('the userRouter', () => {
    it('GET /api/users/all should show all users in database', (done) => {
      request('localhost:' + port)
        .get('/api/users/all')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.length).to.eql(1);
          done();
        });
    });

    it('GET /api/users/userId should show test user if valid id is given', (done) => {
      request('localhost:' + port)
        .get('/api/users/' + testUser._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.firstName).to.eql('Test');
          expect(res.body.lastName).to.eql('User');
          expect(res.body.email).to.eql('test@example.com');
          done();
        });
    });

    it('GET /api/users/randomid should return a 404 not found', (done) => {
      request('localhost:' + port)
        .get('/api/users/randomid')
        .end((err, res) => {
          expect(err.message).to.eql('Not Found');
          expect(res).to.have.status(404);
          done();
        });
    });

    it('POST /api/users should add to database if valid object is posted', (done) => {
      request('localhost:' + port)
        .post('/api/users')
        .send({
          firstName: 'Test2',
          lastName: 'User',
          email: 'test2@example.com'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.firstName).to.eql('Test2');
          expect(res.body.lastName).to.eql('User');
          expect(res.body.email).to.eql('test2@example.com');
          done();
        });
    });

    it('POST /api/users should return err if invalid object is posted', (done) => {
      request('localhost:' + port)
        .post('/api/users')
        .send()
        .end((err, res) => {
          expect(err.message).to.eql('Bad Request');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('PUT /api/users/:id should add to database if valid object is put at existing userId', (done) => {
      request('localhost:' + port)
        .put('/api/users/' + testUser._id)
        .send({
          firstName: 'Test3',
          lastName: 'User',
          email: 'test3@example.com'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('PUT /api/users/:id should return 404 if valid object is put at wrong userId', (done) => {
      request('localhost:' + port)
        .put('/api/users/someid')
        .send({
          firstName: 'Test3',
          lastName: 'User',
          email: 'test3@example.com'
        })
        .end((err, res) => {
          expect(err.message).to.eql('Not Found');
          expect(res).to.have.status(404);
          done();
        });
    });

    it('PUT /api/users/:id should return 400 if invalid object is put at existing userId', (done) => {
      request('localhost:' + port)
        .put('/api/users/' + testUser._id)
        .send()
        .end((err, res) => {
          expect(err.message).to.eql('Bad Request');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('DELETE /api/users/:id should delete if valid id is sent', (done) => {
      request('localhost:' + port)
        .delete('/api/users/' + testUser._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('DELETE /api/users/:id should return 404 if invalid id is sent', (done) => {
      request('localhost:' + port)
        .delete('/api/users/invalid')
        .end((err, res) => {
          expect(err.message).to.eql('Not Found');
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('the orderRouter', () => {
    it('GET /api/orders/all should show all orders in database', (done) => {
      request('localhost:' + port)
        .get('/api/orders/all')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.length).to.eql(1);
          done();
        });
    });

    it('GET /api/orders/orderId should show test order if valid id is given', (done) => {
      request('localhost:' + port)
        .get('/api/orders/' + testOrder._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.orderDate).to.eql('2016-07-31T00:00:00.000Z');
          expect(res.body.comment).to.eql('Please ship everything at once');
          expect(res.body.shippingMethod).to.eql('Economy');
          expect(res.body.status).to.eql('Received');
          done();
        });
    });

    it('GET /api/orders/randomid should return a 404 not found', (done) => {
      request('localhost:' + port)
        .get('/api/orders/randomid')
        .end((err, res) => {
          expect(err.message).to.eql('Not Found');
          expect(res).to.have.status(404);
          done();
        });
    });

    it('POST /api/orders should add to database if valid object is posted', (done) => {
      request('localhost:' + port)
        .post('/api/orders')
        .send({
          comment: 'Test post',
          shippingMethod: 'Post'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.comment).to.eql('Test post');
          expect(res.body.shippingMethod).to.eql('Post');
          expect(res.body.status).to.eql('Received');
          done();
        });
    });

    it('POST /api/orders should return 400 if invalid object is posted', (done) => {
      request('localhost:' + port)
        .post('/api/orders')
        .send()
        .end((err, res) => {
          expect(err.message).to.eql('Bad Request');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('PUT /api/orders/:id should add to database if valid object is put at existing orderId', (done) => {
      request('localhost:' + port)
        .put('/api/orders/' + testOrder._id)
        .send({
          comment: 'Modified',
          shippingMethod: 'Modified'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          Order.findOne({_id: testOrder._id})
            .then((data) => {
              expect(data.comment).to.eql('Modified');
              expect(data.shippingMethod).to.eql('Modified');
              done();
            });
        });
    });

    it('PUT /api/users/:id should return 404 if valid object is put at wrong orderId', (done) => {
      request('localhost:' + port)
        .put('/api/orders/someid')
        .send({
          comment: 'Modified',
          shippingMethod: 'Modified'
        })
        .end((err, res) => {
          expect(err.message).to.eql('Not Found');
          expect(res).to.have.status(404);
          done();
        });
    });

    it('PUT /api/orders/:id should return 400 if invalid object is put at existing orderId', (done) => {
      request('localhost:' + port)
        .put('/api/orders/' + testOrder._id)
        .send()
        .end((err, res) => {
          expect(err.message).to.eql('Bad Request');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('DELETE /api/orders/:id should delete if valid id is sent', (done) => {
      request('localhost:' + port)
        .delete('/api/orders/' + testOrder._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          Order.findOne({_id: testOrder._id})
            .then((data) => {
              expect(data).to.eql(null);
              done();
            });
        });
    });

    it('DELETE /api/orders/:id should return 404 if invalid id is sent', (done) => {
      request('localhost:' + port)
        .delete('/api/orders/invalid')
        .end((err, res) => {
          expect(err.message).to.eql('Not Found');
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
