'use strict';
const Party = require('../models/partyschema');
const jsonParser = require('body-parser').json();
const express = require('express');
const AppError = require('../lib/apperror');

let pandaPartyRouter = module.exports = exports = express.Router({mergeParams: true});
let findParty = function(req, res, next) {
  Party.findOne({'_id': req.params.partyId})
  .then((party) => {
    if (!party) return res.sendError(AppError.error404('err 404').respond(res), next);(new Error('Party Not Found'));
    req.party = party;
    next();
  }, res.sendError(AppError.error404('err 404').respond(res)));
};

pandaPartyRouter.get('/', findParty, (req, res, next) => {
  req.party.findAllPandas().then(res.json.bind(res), res.sendError(AppError.error500('err 500').respond(res)), next);
});

pandaPartyRouter.post('/', jsonParser, findParty, (req, res, next) => {
  req.party.makePanda(req.body).then(res.json.bind(res), res.sendError(AppError.error400('err 400').respond(res)), next);
});

pandaPartyRouter.put('/:id', findParty, (req, res, next) => {
  req.party.addPanda(req.params.id).then(res.json.bind(res), res.sendError(AppError.error404('err 404').respond(res)), next);
});

pandaPartyRouter.delete('/:id', findParty, (req, res, next) => {
  req.party.removePanda(req.params.id).then(res.json.bind(res), res.sendError(AppError.error404('err 404').respond(res)), next);
});
