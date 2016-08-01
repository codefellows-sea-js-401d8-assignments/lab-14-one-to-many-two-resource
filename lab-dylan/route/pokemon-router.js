'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Pokemon = require('../model/pokemon');
const appError = require('../lib/AppError');

const debug = require('debug');
const serverLog = debug('server:log');
const pokemonRouter = module.exports = exports = express.Router();

pokemonRouter.get('/:id', (req, res, next) => {
  let _id = req.params.id;
  serverLog('Type: GET, pokemon with id ' + _id);
  let handleError404 = appError(404, next);
  let handleError = appError(400, next, 'Invalid id');
  Pokemon.findOne({_id: req.params.id}).then((data) => {
    if (!data) return next(handleError404(new Error('Pokemon not found')));
    res.json(data);
  }, handleError);
});

pokemonRouter.get('/', (req, res, next) => {
  serverLog('Type: GET, all pokemon');
  let handleError = appError(500, next, 'Internal server error');
  Pokemon.find().then(res.json.bind(res), handleError);
});

pokemonRouter.post('/', jsonParser, (req, res, next) => {
  serverLog('Type: POST, post pokemon');
  let handleErrorValidation = appError(400, next);
  (Pokemon(req.body)).save().then(res.json.bind(res), handleErrorValidation);
});

pokemonRouter.put('/:id', jsonParser, (req, res, next) => {
  serverLog('Type: PUT, pokemon');
  (Pokemon.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), appError(400, next)));
});

pokemonRouter.delete('/:id', (req, res, next) => {
  serverLog('Type: DELETE, pokemon');
  let _id = req.params.id;
  (Pokemon.remove({'_id': _id}, req.body).then(res.json.bind(res), appError(400, next, 'Invalid id')));
});
