'use strict';
const City = require('../models/city');
const jsonParser = require('body-parser').json();
const express = require('express');
const HandleError = require('../lib/handleError');

let cityFriendsRouter = module.exports = exports = express.Router({mergeParams: true});

let findCity = function(req, res, next) {
  City.findOne({'_id': req.params.cityId})
  .then((city) => {
    if(!city) return HandleError(404, next)(new Error('City Not Found'));
    req.city = city;
    next();
  }, HandleError(404, next, 'No Such City'));
};

cityFriendsRouter.get('/', findCity, (req, res, next) => {
  req.city.findAllFriends().then(res.json.bind(res), HandleError(500, next, 'server error'));
});

cityFriendsRouter.post('/', jsonParser, findCity, (req, res, next) => {
  req.city.makeFriend(req.body).then(req.json.bind(res), HandleError(400, next));
});

cityFriendsRouter.put('/:id', jsonParser, findCity, (req, res, next) => {
  req.city.addFriend(req.params.id).then(res.json.bind(res), HandleError(404, next, 'No Such Friend'));
});

cityFriendsRouter.delete('/:id', findCity, (req, res, next) => {
  req.city.removeFriend(req.params.id).then(res.json.bind(res), HandleError(404, next, 'No Such Friend'));
});
