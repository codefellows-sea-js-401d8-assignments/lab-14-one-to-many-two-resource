'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;
const mongoose = require('mongoose');
const PartySchema = require('../models/partyschema');
const PandaSchema = require('../models/pandaschema');
var app = require('./testserver');

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('CRUD tests', () => {
  let newParty, newPanda;
  before(function(done){
    app.listen(5000, () => {
      console.log('Server up on 5000');
    });
    newParty = PartySchema({theme:'costume', location: 'Seattle'});
    newParty.save((err, party) => {
      newParty = party;
    });
    newPanda = PandaSchema({name:'aliza', age: 27, happy: true});
    newPanda.save((err, panda) => {
      newPanda = panda;
      done();
    });
  });

  after((done) =>{
    mongoose.connection.db.dropDatabase(()=>{
      mongoose.disconnect(() => {
        app.close();
        done();
      });
    });
  });

  it('should POST a new party', (done) => {
    request('localhost:5000')
      .post('/api/party/newparty')
      .send({
        theme: 'costume',
        location: 'seattle'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should POST a new panda', (done) => {
    request('localhost:5000')
      .post('/api/panda/newpanda')
      .send({
        name: 'aliza',
        age: 27,
        happy: true
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('GET 404', (done) => {
    request('localhost:5000')
      .get('/wrong')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });
  it('it should GET all parties', (done) => {
    request('localhost:5000')
      .get('/api/party/allparties')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('GET party', (done) => {
    request('localhost:5000')
      .get('/api/party/' + newParty._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.theme).to.eql('costume');
        done();
      });
  });

  it('GET panda', (done) => {
    request('localhost:5000')
      .get('/api/panda/' + newPanda._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('aliza');
        done();
      });
  });

  it('DELETE party', (done) => {
    request('localhost:5000')
      .delete('/api/party/' + newParty._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
