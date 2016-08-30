'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const baseUrl = 'localhost:3000/api/city';
const City = require('../models/city');

describe('city Crud tests', function() {
  it('should create a league', function(done) {
    request(baseUrl)
      .post('/')
      .send({name: 'Seattle', state: 'WA'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Seattle');
        expect(res.body.state).to.eql('WA');
        done();
      });
  });
});

describe('with a city in db', function() {
  let newCity;
  before(function(done) {
    newCity = new City({name: 'Redmond', state: 'WA'});
    newCity.save().then((cityData) => {
      this.city = cityData;
      done();
    }, (err) => {
      throw err;
    });
  });

  it('should get city with name Redmond', function(done) {
    request(baseUrl)
    .get('/' + newCity._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Redmond');
      done();
    });
  });
});
