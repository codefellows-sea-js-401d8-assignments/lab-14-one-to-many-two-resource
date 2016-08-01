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
    // .then(res.json.bind(res), AppError.status404('Page not found'));
});

heroZoneRouter.post('/', jsonParser, findZone, (req, res) => {
  req.zone.buildHero(req.body, res);
    // .then(res.json.bind(res), AppError.status400('Invalid body'));
});

heroZoneRouter.put('/:id', findZone, (req, res) => {
  req.zone.addHero(req.params.id, res);
    // .then(res.json.bind(res), AppError.status404('Hero not found'));
});

heroZoneRouter.delete('/:id', findZone, (req, res) => {
  req.zone.removeHero(req.params.id, res);
    // .then(res.json.bind(res), AppError.status404('Hero not found'));
});
