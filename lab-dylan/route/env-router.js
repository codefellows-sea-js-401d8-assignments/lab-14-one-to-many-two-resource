'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const appError = require('../lib/AppError');
const Environment = require('../model/environment');
const debug = require('debug');
const serverLog = debug('server:log');

let environmentPokemonRouter = require('./environment-pokemon-router');
let envRouter = module.exports = exports = express.Router();

envRouter.get('/:id', (req, res, next) => {
  let _id = req.params.id;
  serverLog('Type: GET, environment with id ' + _id);
  let handleError404 = appError(404, next);
  let handleError = appError(400, next, 'Invalid id');
  Environment.findOne({_id: req.params.id}).then((data) => {
    if (!data) return next(handleError404(new Error('Environment not found')));
    res.json(data);
  }, handleError);
});

envRouter.get('/', (req, res, next) => {
  serverLog('Type: GET, all environments');
  let handleError = appError(500, next, 'Internal server error');
  Environment.find().then(res.json.bind(res), handleError);
});

envRouter.post('/', jsonParser, (req, res, next) => {
  serverLog('Type: POST, post enviroments');
  let handleErrorValidation = appError(400, next);
  (Environment(req.body)).save().then(res.json.bind(res), handleErrorValidation);
});

envRouter.put('/:id', jsonParser, (req, res, next) => {
  serverLog('Type: PUT, environment');
  (Environment.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), appError(400, next)));
});

envRouter.delete('/:id', (req, res, next) => {
  serverLog('Type: DELETE, pokemon');
  let _id = req.params.id;
  (Environment.remove({'_id': _id}, req.body).then(res.json.bind(res), appError(400, next, 'Invalid id')));
});


envRouter.use('/:envId/pokemon', environmentPokemonRouter);
