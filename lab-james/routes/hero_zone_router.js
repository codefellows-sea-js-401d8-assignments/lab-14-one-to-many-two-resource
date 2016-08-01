'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const Zone = require('../model/zone');
const AppError = require('../lib/app_error');

let heroZoneRouter = module.exports = exports = express.Router({mergeParams: true});

let findZone = function(req, res, next) {
  Zone.findOne({'_id': req.params.zoneId}, (err, zone) => {
    if (err) return res.sendError(AppError.status404('No factions found'));
    req.zone = zone;
    next();
  });
};

heroZoneRouter.get('/', findZone, (req, res) => {
  req.zone.findAllHeroes()
    .then(res.json.bind(res), res.sendError(AppError.status500('Database error')));
});

heroZoneRouter.post('/', jsonParser, findZone, (req, res) => {
  req.zone.buildHero(req.body)
    .then(res.json.bind(res), res.sendError(AppError.status400('Invalid body')));
});

heroZoneRouter.put('/:id', findZone, (req, res) => {
  req.zone.addHero(req.params.id)
    .then(res.json.bind(res), res.sendError(AppError.status404('page not found')));
});

heroZoneRouter.delete('/:id', findZone, (req, res) => {
  req.zone.removeHero(req.params.id)
    .then(res.json.bind(res), res.sendError(AppError.status404('page not found')));
});
