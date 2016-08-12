
'use strict';

const PartySchema = require('../models/partyschema');
const jsonParser = require('body-parser').json();
const express = require('express');
const HandleError = require('../lib/apperror');

let pandaPartyRouter = express.Router({mergeParams: true});

let findParty = function(req, res, next) {
  PartySchema.findOne({'_id': req.params.partyId})
    .then((party) => {
      if (!party) return HandleError(404, next)(new Error('Party Not Found'));
      req.party = party;
      next();
    }, HandleError(404, next, 'No Such Party'));
};

pandaPartyRouter.get('/', findParty, (req, res, next) => {
  req.party.getAllPandas()
    .then(res.json.bind(res), HandleError(500, next, 'server error'));
});

pandaPartyRouter.post('/', jsonParser, findParty, (req, res, next) => {
  req.party.newPanda({'name': req.body.name, 'age': req.body.age, 'happy': req.body.happy}).then(res.json.bind(res), HandleError(400, next));
});

pandaPartyRouter.put('/:pandaid', findParty, (req, res, next) => {
  req.party.addPanda(req.params.pandaId).then(res.json.bind(res), HandleError(404, next, 'No Such Party'));
});

pandaPartyRouter.delete('/:id', findParty, (req, res, next) => {
  req.party.removePanda(req.params.id).then(res.json.bind(res), HandleError(404, next, 'No Such Party'));
});

module.exports = exports = pandaPartyRouter;
