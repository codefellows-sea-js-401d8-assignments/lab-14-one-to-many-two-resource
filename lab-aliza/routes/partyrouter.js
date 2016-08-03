'use strict';
const express = require('express');
const Party = require('../models/partyschema');
const jsonParser = require('body-parser').json();
const AppError = require('../lib/errorresponse');

let pandaPartyRouter = require('./pandapartyrouter');
let partyRouter = module.exports = exports = express.Router();

partyRouter.get('/', (req, res, next) => {
  let handleDbError = res.sendError(AppError.error500('err 500'), next);
  Party.find().then(res.json.bind(res), handleDbError);
});

partyRouter.get('/:id', (req, res, next) => {
  let handleDbError = res.sendError(AppError.error400('err 400'));
  let fourOhFour = res.sendError(AppError.error404('err 404'));
  Party.findOne({'_id': req.params.id}).then((data) => {
    if (!data) return next(fourOhFour(new Error('Party not found.')));
    res.json(data);
  }, handleDbError);
});

partyRouter.post('/', jsonParser, (req, res, next) => {
  let handleBadValidation = res.sendError(AppError.error400('err 400'), next);
  (Party(req.body)).save().then(res.json.bind(res), handleBadValidation);
});

partyRouter.put('/:id', jsonParser, (req, res, next) => {
  (Party.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), res.sendError(AppError.error400('err 400')), next));
});

partyRouter.delete('/:id', (req, res, next) => {
  (Party.remove({'_id': req.params.id})).then(res.json.bind(res), res.sendError(AppError.error400('err 400')), next);
});

partyRouter.use('/:partyId/panda', pandaPartyRouter);
