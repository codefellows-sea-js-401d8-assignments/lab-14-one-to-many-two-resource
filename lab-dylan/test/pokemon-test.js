'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

const mongoose = require('mongoose');
const Pokemon = require('../model/pokemon');
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

  it('should POST', (done) => {
    let testPokemon = Pokemon({name: 'bulbachu', element: 'mixed', number: 3});
    request('localhost:5000')
      .post('/api/pokemon/')
      .send(testPokemon)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
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
  it('it should GET a list of pokemon', (done) => {
    request('localhost:5000')
      .get('/api/pokemon/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });


});

describe('CRUD altering pokemon tests', () => {
  let testPokemon;
  before((done) => {
    server = app.listen(5000, () => {
      console.log('Server up on 5000');
    });
    testPokemon = Pokemon({name:'clepuff', element:'fairy', number:37});
    testPokemon.save((err, pokemon) => {
      testPokemon = pokemon;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should GET a pokemon', (done) => {
    request('localhost:5000')
      .get('/api/pokemon/' + testPokemon._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('clepuff');
        expect(res.body.element).to.eql('fairy');
        expect(res.body.number).to.eql(37);
        done();
      });
  });

  it('should PUT a pokemon', (done) => {
    testPokemon.number = 50;
    request('localhost:5000')
      .put('/api/pokemon/' + testPokemon._id)
      .send(testPokemon)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should DELETE a pokemon', (done) => {
    let testId = testPokemon._id;
    request('localhost:5000')
      .delete('/api/pokemon/' + testId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
