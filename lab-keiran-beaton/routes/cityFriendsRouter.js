'use strict';
const City = require('../models/city');
const jsonParser = require('body-parser').json();
const express = require('express');
const handleError = require('../lib/handleError');

let cityFriendsRouter = module.exports = exports = express.Router();

let findCity = function(req, res, next) {
  City.findOne({'_id': req.params.cityId})
  .then((city) => {
    req.city = city;
    next();
  }, handleError(404, next, 'No Such City'));
};

cityFriendsRouter.get('/', findCity, (req, res, next) => {
  req.city.getAllFriend().then(res.json.bind(res), handleError(500, next, 'server error'));
});

cityFriendsRouter.post('/', jsonParser, findCity, (req, res, next) => {
  req.city.makeFriend(req.body).then(req.json.bind(res), handleError(400, next));
});

cityFriendsRouter.put('/:id', jsonParser, findCity, (req, res, next) => {
  req.city.addFriend(req.params.id).then(res.json.bind(res), handleError(404, next, 'No Such Friend'));
});

cityFriendsRouter.delete('/:id', findCity, (req, res, next) => {
  req.city.removeFriend(req.params.id).then(res.json.bind(res), handleError(404, next, 'No Such Friend'));
});
