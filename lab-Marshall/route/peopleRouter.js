'use strict';

const People = require('../lib/people');
const express = require('express');
const jsonParser = require('body-parser').json();
const handleError = require('../model/handleError');

let peopleRouter = module.exports = exports = express.Router();

peopleRouter.get('/', (req, res, next) => {
  People.find().then(res.json.bind(res), handleError(500, next, '500: He\'s dead, Jim.'));
});

peopleRouter.put('/:id', jsonParser, (req, res, next) => {
  People.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), handleError(400, next, '400: bad request'));
});

peopleRouter.post('/', jsonParser, (req, res, next) => {
  People(req.body).save().then(res.json.bind(res), handleError(400, next));
});

peopleRouter.delete('/:id', jsonParser, (req, res, next) => {
  People.remove({'_id': req.params.id}).then(res.json.bind(res), handleError(404, next, '404: They were already dead, Jim!!'));
});
