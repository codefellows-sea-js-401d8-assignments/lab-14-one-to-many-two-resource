'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;
const mongoose = require('mongoose');

const Hero = require('../model/hero');
const Zone = require('../model/zone');
var app = require('./test_server');
let server;

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

let testHero;
let testHero2;
let testZone;
let testZone2;

describe('Testing CRUD that requires initial data', () => {
  before((done) => {
    server = app.listen(3000, () => {
      console.log('Server is up');
    });
    testHero = Hero({
      name: 'thrall',
      race: 'orc',
      faction: 'horde'
    });
    testHero.save((err, hero) => {
      testHero = hero;
    });
    testHero2 = Hero({
      name: 'bronzebeard',
      race: 'dwarf',
      faction: 'alliance'
    });
    testHero2.save((err, hero) => {
      testHero2 = hero;
    });
    testZone = Zone({
      name: 'durotar',
      continent: 'kalimdor'
    });
    testZone.save((err, zone) => {
      testZone = zone;
    });
    testZone2 = Zone({
      name: 'dun morogh',
      continent: 'eastern kingdoms'
    });
    testZone2.save((err, zone) => {
      testZone2 = zone;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('/GET should GET the hero', (done) => {
    request('localhost:3000')
      .get('/api/hero/' + testHero._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.text).to.have.string('thrall');
        done();
      });
  });
  it('/GET should error with 404', (done) => {
    request('localhost:3000')
    .get('/api/hero/321')
    .end((err, res) => {
      expect(err).to.have.status(404);
      expect(res.text).to.eql('No hero found');
      done();
    });
  });
  it('/GET should GET all heroes', (done) => {
    request('localhost:3000')
    .get('/api/hero/all')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.have.string('thrall');
      expect(res.text).to.have.string('bronzebeard');
      done();
    });
  });
  it('/GET should GET the zone', (done) => {
    request('localhost:3000')
      .get('/api/zone/' + testZone._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.text).to.have.string('durotar');
        done();
      });
  });
  it('/GET should error with 404 not found', (done) => {
    request('localhost:3000')
    .get('/api/zone/123')
    .end((err, res) => {
      expect(err).to.have.status(404);
      expect(res.text).to.eql('Zone not found');
      done();
    });
  });
  it('/GET should GET all heroes', (done) => {
    request('localhost:3000')
    .get('/api/zone/all')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.have.string('durotar');
      expect(res.text).to.have.string('dun morogh');
      done();
    });
  });

  it('/PUT should update a hero', (done) => {
    request('localhost:3000')
    .put('/api/hero/' + testHero._id)
    .send({name: 'guldan'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.have.string('updated thrall');
      done();
    });
  });
  it('/PUT should error with 404 not found', (done) => {
    request('localhost:3000')
    .put('/api/hero/321')
    .send({name: 'guldan'})
    .end((err, res) => {
      expect(err).to.have.status(404);
      expect(res.text).to.eql('No hero found');
      done();
    });
  });
  it('/PUT should error with 400 bad request', (done) => {
    request('localhost:3000')
    .put('/api/hero/' + testHero._id)
    .send({type: 'traitor'})
    .end((err, res) => {
      expect(err).to.have.status(400);
      expect(res.text).to.eql('Invalid body.');
      done();
    });
  });

  it('/PUT should update a zone', (done) => {
    request('localhost:3000')
    .put('/api/zone/' + testZone._id)
    .send({name: 'feralas'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.have.string('updated durotar');
      done();
    });
  });
  it('/PUT should error with 404 not found', (done) => {
    request('localhost:3000')
    .put('/api/zone/321')
    .send({name: 'feralas'})
    .end((err, res) => {
      expect(err).to.have.status(404);
      expect(res.text).to.eql('Zone not found');
      done();
    });
  });
  it('/PUT should error with 400 bad request', (done) => {
    request('localhost:3000')
    .put('/api/hero/' + testZone._id)
    .send({type: 'lots of trees'})
    .end((err, res) => {
      expect(err).to.have.status(400);
      expect(res.text).to.eql('Invalid body.');
      done();
    });
  });

  it('/DELETE should remove the hero', (done) => {
    request('localhost:3000')
    .delete('/api/hero/' + testHero._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(204);
      expect(res.body).to.eql({});
      done();
    });
  });
  it('/DELETE should error with 404 not found', (done) => {
    request('localhost:3000')
    .delete('/api/hero/' + testHero.id)
    .end((err, res) => {
      expect(err).to.have.status(404);
      expect(res.text).to.eql('No hero found');
      done();
    });
  });
  it('/DELETE should remove the zone', (done) => {
    request('localhost:3000')
    .delete('/api/zone/' + testZone._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(204);
      expect(res.body).to.eql({});
      done();
    });
  });
  it('/DELETE should error with 404 not found', (done) => {
    request('localhost:3000')
    .delete('/api/zone/' + testZone.id)
    .end((err, res) => {
      expect(err).to.have.status(404);
      expect(res.text).to.eql('Zone not found');
      done();
    });
  });
});

describe('testing CRUD by creating data', () => {
  before((done) => {
    server = app.listen(3000, () => {
      console.log('Server is up');
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('/POST should POST a new hero', (done) => {
    request('localhost:3000')
    .post('/api/hero')
    .send({name: 'malfurion', race: 'night elf', faction: 'alliance'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.have.string('malfurion');
      done();
    });
  });
  it('/POST should error with 400 bad request', (done) => {
    request('localhost:3000')
    .post('/api/hero')
    .send({name: 'malfurion', type: 'night elf', faction: 'alliance'})
    .end((err, res) => {
      expect(err).to.have.status(400);
      expect(res.text).to.have.string('Invalid body');
      done();
    });
  });
  it('/POST should POST a new zone', (done) => {
    request('localhost:3000')
    .post('/api/zone')
    .send({name: 'elwynn forest', continent: 'eastern kingdoms'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.have.string('elwynn forest');
      done();
    });
  });
  it('/POST should error with 400 bad request', (done) => {
    request('localhost:3000')
    .post('/api/zone')
    .send({name: 'elwynn forest', location: 'middle of nowhere'})
    .end((err, res) => {
      expect(err).to.have.status(400);
      expect(res.text).to.have.string('Invalid body');
      done();
    });
  });
});
