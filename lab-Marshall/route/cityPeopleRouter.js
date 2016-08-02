'use strict';
const City = require('../model/city');
const jsonParser = require('body-parser').json();
const express = require('express');
const HandleError = require('../lib/handleError');

let cityPeopleRouter = module.exports = exports = express.Router({mergeParams: true});
let findCity = function(req, res, next) {
  City.findOne({'_id': req.params.cityId})
  .then((city) => {
    if (!city) return HandleError(404, next)(new Error('City Not Found'));
    req.city = city;
    next();
  }, HandleError(404, next, 'City cant be found!'));
};

cityPeopleRouter.get('/', findCity, (req, res, next) => {
  req.city.findAllPeoples().then(res.json.bind(res), HandleError(500, next, '500: server error'));
});

cityPeopleRouter.post('/', jsonParser, findCity, (req, res, next) => {
  req.city.buildAPeople(req.body).then(res.json.bind(res), HandleError(400, next, '400: bad post'));
});

cityPeopleRouter.put('/:id', findCity, (req, res, next) => {
  req.city.addPeople(req.params.id).then(res.json.bind(res), HandleError(404, next, 'People cant be found'));
});

cityPeopleRouter.delete('/:id', findCity, (req, res, next) => {
  req.city.removePeople(req.params.id).then(res.json.bind(res), HandleError(404, next, '404: People not found!'));
});
