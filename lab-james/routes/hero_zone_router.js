'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const Zone = require('../model/zone');
const AppError = require('../lib/app_error');

let heroZoneRouter = module.exports = exports = express.Router({mergeParams: true});

let findZone = function(req, res, next) {
  Zone.findOne({'_id': req.params.zoneId}, (err, zone) => {
    if (err) return res.sendError(AppError.status404('Zone not found'));
    req.zone = zone;
    next();
  });
};

heroZoneRouter.get('/all', findZone, (req, res) => {
  req.zone.findAllHeroes(res);
});

heroZoneRouter.post('/', jsonParser, findZone, (req, res) => {
  req.zone.buildHero(req.body, res);
});

heroZoneRouter.put('/:id', findZone, (req, res) => {
  req.zone.addHero(req.params.id, res);
});

heroZoneRouter.delete('/:id', findZone, (req, res) => {
  req.zone.removeHero(req.params.id, res);
});
