'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

const mongoose = require('mongoose');
const Environment = require('../model/environment');
var app = require('../server');
var server;

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('Test crud', () => {
  before((done) => {
    server = app.listen(5000, () => {
      console.log('server up on 5000');
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should POST an environment', (done) => {
    request('localhost:5000')
      .post('/api/environment/')
      .send({
        name: 'Desert',
        location: 'Arizona'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should respond with 404', (done) => {
    request('localhost:5000')
      .get('/invalidpath')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });
  it('it should GET a list of enviroments', (done) => {
    request('localhost:5000')
      .get('/api/environment/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});

describe('CRUD altering environment tests', () => {
  let testEnv;
  before((done) => {
    server = app.listen(5000, () => {
      console.log('Server up on 5000');
    });
    testEnv = Environment({name:'Mountains', location: 'Mt. Rainier'});
    testEnv.save((err, env) => {
      testEnv = env;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should GET an env', (done) => {
    request('localhost:5000')
      .get('/api/environment/' + testEnv._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Mountains');
        expect(res.body.location).to.eql('Mt. Rainier');
        done();
      });
  });

  it('should PUT an env', (done) => {
    testEnv.location = 'Mt. Baker';
    request('localhost:5000')
      .put('/api/environment/' + testEnv._id)
      .send(testEnv)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.location).to.eql('Mt. Rainier');
        done();
      });
  });

  it('should DELETE an environment', (done) => {
    let testId = testEnv._id;
    request('localhost:5000')
      .delete('/api/environment/' + testId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
