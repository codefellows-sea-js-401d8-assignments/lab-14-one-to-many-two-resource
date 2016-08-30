'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const request = chai.request;
const Friend = require('../models/friend');
const baseUrl = 'localhost:3000/api/friend';
chai.use(chaiHttp);

describe('Friend CRUD tests', function() {
  it('Should create a new user', function(done) {
    request(baseUrl)
      .post('/')
      .send({name: 'Keiran', whenMet: 2016, gender: 'male'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.status).to.eql(200);
        done();
      });
  });

  describe('adding user to db and testing', function() {
    let friend;
    before(function(done) {
      friend = new Friend({name: 'Beaton', whenMet: 2015, gender: 'Male'});
      friend.save().then((friendData) => {
        this.friend = friendData;
        done();
      }, (err) => {throw err;
      });
    });

    it('Should GET friend', function(done) {
      request(baseUrl)
        .get('/' + friend._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
          expect(res.body.name).to.eql('Beaton');
          done();
        });
    });

    it('Should GET all friends', function(done) {
      request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('Should update Friend', function(done) {
      friend.name = 'Laura';
      request(baseUrl)
        .put('/' + friend._id)
        .send({name: 'Laura'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('should DELETE a friend', function(done) {
      request(baseUrl)
      .delete('/' + friend._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
    });

    it('badId on get request should not be found', function(done) {
      request(baseUrl)
      .get('/badrequest')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        expect(err.message).to.eql('Not Found');
        done();
      });
    });

    it('Should give a bad POST request', function(done) {
      request(baseUrl)
      .post('/')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(400);
        expect(res.body).to.eql('Friend validation failed');
        done();
      });
    });

    it('should not find fakeIdHere on delete request', function(done) {
      request(baseUrl)
        .delete('/fakeIdHere')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res.status).to.eql(404);
          done();
        });
    });
  });
});
