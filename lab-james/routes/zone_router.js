'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const AppError = require('../lib/app_error');
const Zone = require('../model/zone');

let heroZoneRouter = require('./hero_zone_router');
let zoneRouter = module.exports = exports = express.Router();

zoneRouter.get('/all', (req, res) => {
  Zone.find({}, (err, zone) => {
    if (err)
      return res.sendError(AppError.status400('Bad request'));
    if(zone.length === 0)
      return res.json('No zones exist at this time');
    res.json(zone);
  });
});

zoneRouter.get('/:id', (req, res) => {
  Zone.find({'_id': req.params.id}, (err, zone) => {
    if (err)
      return res.sendError(AppError.status404('Zone not found'));
    if (zone.length === 0)
      return res.sendError(AppError.status404('Zone not found'));
    res.json(zone);
  });
});

zoneRouter.post('/', jsonParser, (req, res) => {
  let newZone = Zone(req.body);
  newZone.save((err, zone) => {
    if (err)
      return res.sendError(AppError.status400('Invalid body'));
    res.json(zone);
  });
});

zoneRouter.put('/:id', jsonParser, (req, res) => {
  if (!req.body.name && !req.body.continent)
    return res.sendError(AppError.status400('Invalid body'));
  Zone.findOneAndUpdate({'_id': req.params.id}, req.body, (err, zone) => {
    if (err)
      return res.sendError(AppError.status404('Zone not found'));
    if (zone === null)
      return res.sendError(AppError.status404('Zone not found'));
    res.json('updated ' + zone.name);
  });
});

zoneRouter.delete('/:id', jsonParser, (req, res) => {
  Zone.findByIdAndRemove({'_id': req.params.id}, (err, zone) => {
    if (err)
      return res.sendError(AppError.status404('Zone not found'));
    if (zone === null)
      return res.sendError(AppError.status404('Zone not found'));
    res.status(204).send({});
  });
});

zoneRouter.use('/:zoneId/hero', heroZoneRouter, (err, req, res, next) => {
  if (err) return res.sendError(AppError.status404('Zone not found'));
  next();
});
