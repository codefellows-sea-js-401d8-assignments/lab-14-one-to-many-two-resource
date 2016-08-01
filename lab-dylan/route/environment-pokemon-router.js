'use strict';
const Environment = require('../model/environment');
const jsonParser = require('body-parser').json();
const express = require('express');
const appError = require('../lib/AppError');

let environmentPokemonRouter = module.exports = exports = express.Router({mergeParams: true});

let findEnv = function(req, res, next) {
  Environment.findOne({'_id': req.params.envId})
  .then((environment) => {
    if(!environment) return appError(400, next)(new Error('Environment Not Found'));
    req.env = environment;
    next();
  }, appError(404, next, 'Environment Does Not Exist'));
};

environmentPokemonRouter.get('/', findEnv, (req, res, next) => {
  req.env.findAllPokemon().then(res.json.bind(res), appError(400, next));
});

environmentPokemonRouter.get('/:id', findEnv, (req, res, next) => {
  req.env.findOne({'_id': req.params.id}).then(res.json.bind(res), appError(404, next, 'Not Found'));
});
environmentPokemonRouter.post('/', jsonParser, findEnv, (req, res, next) => {
  req.env.addPokemon(req.body).then(res.json.bind(res), appError(400, next));
});

environmentPokemonRouter.put('/:id', findEnv, (req, res, next) => {
  req.env.updatePokemon(req.params.id).then(res.json.bind(res), appError(404, next, 'Pokemon not found'));
});

environmentPokemonRouter.delete('/:id', findEnv, (req, res, next) => {
  req.env.removePokemon(req.params.id).then(res.json.bind(res), appError(404, next, 'Pokemon does not exist'));
});
