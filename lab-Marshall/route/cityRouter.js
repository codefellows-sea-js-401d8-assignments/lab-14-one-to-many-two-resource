'use strict';
const express = require('express');
const City = require('../lib/city');
const jsonParser = require('body-parser').json();
const HandleError = require('../model/handleError');

let cityPeopleRouter = require('./cityPeopleRouter');
let cityRouter = module.exports = exports = express.Router();

cityRouter.get('/', (req, res, next) => {
  let handleDbError = HandleError(500, next, '500: The city exploded!');
  City.find().then(res.json.bind(res), handleDbError);
});

cityRouter.get('/:id', (req, res, next) => {
  let handleDbError = HandleError(400, next, '400: bad request');
  let fourOhFour = HandleError(404, next);
  City.findOne({'_id': req.params.id}).then((data) => {
    if (!data) return next(fourOhFour(new Error('404: The city exploded!!!')));
    res.json(data);
  }, handleDbError);
});

cityRouter.post('/', jsonParser, (req, res, next) => {
  let handleBadValidation = HandleError(400, next);
  (City(req.body)).save().then(res.json.bind(res), handleBadValidation);
});

cityRouter.put('/:id', jsonParser, (req, res, next) => {
  (City.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), HandleError(400, next, '400: Cant place city!')));
});

cityRouter.delete('/:id', (req, res, next) => {
  (City.remove({'_id': req.params.id})).then(res.json.bind(res), HandleError(400, next, 'Bad _id'));
});

cityRouter.use('/:cityId/bear', cityPeopleRouter);
