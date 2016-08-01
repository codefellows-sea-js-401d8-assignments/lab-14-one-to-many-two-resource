'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const port = 5000;
const afterStuff = require('./after.js');

process.env.mongoTestServer = 'mongodb://localhost/author_test';

describe('One to Many Database,) ', () => {
  let server;
  before(function(done) {
    server = require('../lib/_server.js').listen(port, () => console.log('server up on ' + port));
    done();
  });

  after(function(done) {
    afterStuff(server, done);
  });


  it('test 1: should return a status code of 404 for a GET request for unregistered routes', (done) => {
    request('localhost:' + port)
      .get('/')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('test 2: should return a status code of 404 for a GET request with a valid request with an id that was not found', (done) => {
    request('localhost:' + port + '/api')
      .get('/author/shakespeare')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('test 3: should return a status code of 400 for GET requests with no id', (done) => {
    request('localhost:' + port + '/api')
      .get('/author/')
      .end(function(err) {
        expect(err).to.have.status(400, 'No id provided');
        done();
      });
  });

  it('test 4: should return a status code of 200 for a POST if there is a valid body', (done) => {
    request('localhost:' + port + '/api')
      .post('/author/')
      .send({
        name: 'william shakespeare',
        genre: 'theatrical'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('test 5: should return a status code of 200 for a GET request with a valid id', (done) => {
    request('localhost:' + port + '/api')
      .get('/author/shakespeare')
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status code should be 200');
        done();
      });
  });

  it('test 6: should return a status code of 400 for a POST request if no/invalid body provided', (done) => {
    request('localhost:' + port + '/api')
      .post('/author/')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
        done();
      });
  });

  it('test 7: should return a status code of 200 for a PUT request with a valid body', (done) => {
    request('localhost:' + port + '/api')
      .put('/author/shakespeare')
      .send({
        name: 'stephen king',
        type: 'horror'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('test 8: should return a status code of 400 for a PUT request if no/invalid body provided', (done) => {
    request('localhost:' + port + '/api')
      .put('/author/shakespeare')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
        done();
      });
  });

  it('test 9: should return a status code of 404 for a valid PUT request with an id that was not found', (done) => {
    request('localhost:' + port + '/api')
      .put('/author/dickens')
      .send({
        name: 'edgar allan poe',
        genre: 'poetry'
      })
      .end(function(err) {
        expect(err).to.have.status(404, 'the status should be 404');
        done();
      });
  });

  it('test 10: should return a status code of 400 for a valid "DELETE" request ', (done) => {
    request('localhost:' + port + '/api')
      .delete('/author/shakespeare')
      .end(function() {
        done();
      });
    request('localhost:' + port + '/api')
      .get('/author/shakespeare')
      .end(function(err) {
        expect(err).to.have.status(404, 'the status should be 404');
      });
  });
});
