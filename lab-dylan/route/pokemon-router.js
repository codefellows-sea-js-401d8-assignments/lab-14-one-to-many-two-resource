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
  // Pokemon.findOne({
  //   _id
  // }, (err, pokemon) => {
  //   if (err) res.sendError(err, req, res, next);
  //   res.json(pokemon);
  // });
});

pokemonRouter.get('/', (req, res, next) => {
  serverLog('Type: GET, all pokemon');
  let handleError = appError(500, next, 'Internal server error');
  Pokemon.find().then(res.json.bind(res), handleError);
  // Pokemon.find({}, (err, pokemons) => {
  //   if (err.error.type === 'AppError') return next(err);
  //   if(err) appError(500, 'Internal server error', next)(err);
  //   res.json(pokemons);
  // });
});

pokemonRouter.post('/', jsonParser, (req, res, next) => {
  serverLog('Type: POST, post pokemon');
  let handleErrorValidation = appError(400, next);
  (Pokemon(req.body)).save().then(res.json.bind(res), handleErrorValidation);
  // if(req.body.name && req.body.element && req.body.number) {
  //   let newPokemon = new Pokemon(req.body);
  //   newPokemon.save((err, pokemon) => {
  //     if (err) return next(err);
  //     res.json(pokemon);
  //   });
  // }
});

pokemonRouter.put('/:id', jsonParser, (req, res, next) => {
  serverLog('Type: PUT, pokemon');
  (Pokemon.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), appError(400, next)));
  // Pokemon.findOneAndUpdate({
  //   '_id': req.params.id
  // }, req.body, (err) => {
  //   if (err) return res.sendError(err);
  //   res.json({
  //     message: 'success'
  //   });
  //   next();
  // });
});

pokemonRouter.delete('/:id', (req, res, next) => {
  serverLog('Type: DELETE, pokemon');
  let _id = req.params.id;
  (Pokemon.remove({'_id': _id}, req.body).then(res.json.bind(res), appError(400, next, 'Invalid id')));
  // Pokemon.findOneAndRemove({_id}, (err) => {
  //   if (err.error.type === 'AppError') return next(err);
  //   res.json({
  //     message: 'successfully deleted'
  //   });
  // });
});
