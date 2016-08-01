'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const request = require('chai').request;
const mongoose = require('mongoose');
const serverPort = 9000;

describe('routing', function() {
  var server;
  before((done) => {
    server = require('../server');
    done();
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {});
    server.close();
    done();
  });
  it('should handle unregistered routes', function(done) {
    request('localhost:' + serverPort)
    .get('/notARoute')
    .end(function(res){
      expect(res).to.have.status(404);
      done();
    });
  });
});
