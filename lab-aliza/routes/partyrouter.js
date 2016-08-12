'use strict';

const Router = require('express').Router;
const HandleError = require('../lib/apperror');
const PartySchema = require('../models/partyschema');
const pandaPartyRouter = require('./pandapartyrouter');
const jsonParser = require('body-parser').json();

let partyRouter = Router();

partyRouter.post('/newparty', jsonParser, (req, res, next) => {
  let newParty = new PartySchema({'theme': req.body.theme, 'location': req.body.location});
  newParty.save((err, partyData) =>{
    if (err) return next(err);
    res.send(partyData);
  });
});

partyRouter.get('/allparties', (req, res, next) => {
  PartySchema.find().then(res.json.bind(res), HandleError(500, next, 'Server Error'));
});

partyRouter.get('/:partyid', (req, res, next) => {
  let DBError = HandleError(400, next, 'invalid id');
  let Err404 = HandleError(404, next);
  PartySchema.findOne({'_id': req.params.partyid}).then((data) => {
    if (!data) return next(Err404(new Error('Party not found.')));
    res.json(data);
  }, DBError);
});

partyRouter.delete('/:partyId', (req, res, next) => {
  PartySchema.remove({'_id': req.params.partyId}).then(res.json.bind(res), HandleError(500, next, 'Server Error'));
});

partyRouter.use('/:partyid/panda', pandaPartyRouter);

module.exports = exports = partyRouter;
