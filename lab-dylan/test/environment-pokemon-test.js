'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

const mongoose = require('mongoose');
const Environment = require('../model/environment');
const Pokemon = require('../model/pokemon');
var app = require('../server');
var server;

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('CRUD altering environment tests', () => {
  let testEnv;
  let testPokemon;
  before((done) => {
    server = app.listen(5000, () => {
      console.log('Server up on 5000');
    });
    testPokemon = Pokemon({name:'clepuff', element:'fairy', number:37});
    testPokemon.save((err, pokemon) => {
      testPokemon = pokemon;
    });
    testEnv = Environment({name:'Mountains', location: 'Mt. Rainier'});
    testEnv.save((err, env) => {
      testEnv = env;
    });
    request('localhost:5000')
    .put('/api/pokemon/' + testPokemon._id)
    .send({envId: testEnv._id})
    .end((err, res) => {
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should PUT testPokemon into testEnv', (done) => {
    testEnv.location = 'Mt. Baker';
    request('localhost:5000')
    .put('/api/pokemon/' + testPokemon._id)
    .send({envId: testEnv._id})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('should GET an pokemon with _id in environment with _id', (done) => {
    console.log(testPokemon._id);
    request('localhost:5000')
      .get('/api/' + testEnv._id + '/pokemon/' + testPokemon._id)
      .end((err, res) => {
        debugger;
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        // expect(res.body.location).to.eql('Mt. Rainier');
        done();
      });
  });


  it('should DELETE pokemon from environment', (done) => {
    request('localhost:5000')
      .delete('/api/' + testEnv._id + '/pokemon/' + testPokemon._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
