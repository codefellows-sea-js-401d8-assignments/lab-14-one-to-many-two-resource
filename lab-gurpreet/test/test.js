'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const expect = chai.expect;

const mongoose =require('mongoose');
const User = require('../model/userschema');

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_server = TEST_DB_SERVER;

var app = require('../server');
// let server;

describe('Test CRUD', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      app.close();
      done();
    });
  });

  it('should POST', (done) => {
    request('localhost:3000')
      .post('/api/user')
      .send({
        name: 'testname',
        active: true,
        year_added: 2016
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Testing CRUD', () => {
  let testUser;
  before((done) => {
    app.listen(3000, () => {
      console.log('server up');
    });
    testUser = User({
      name: 'gurpreet',
      active: true,
      year_added: 2016
    });
    testUser.save((err, user) => {
      testUser = user;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      app.close();
      done();
    });
  });
  it('should GET a user', (done) => {
    request('localhost:3000')
      .get('/api/user/' + testUser._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.year_added).to.eql(2016);
        done();
      });
  });
});
