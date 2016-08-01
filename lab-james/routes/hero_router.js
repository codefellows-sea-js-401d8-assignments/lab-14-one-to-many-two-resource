'use strict';
const Hero = require('../model/hero');
const express = require('express');
const jsonParser = require('body-parser').json();
const AppError = require('../lib/app_error');

let heroRouter = module.exports = exports = express.Router();

heroRouter.get('/', (req, res) => {
  Hero.find({}, (err, hero) => {
    if (err) return res.sendError(AppError.status400('Bad request'));
    if (hero.length === 0) return res.sendError(AppError.status404('No heroes found'));
    res.json(hero);
  });
});

heroRouter.get('/:id', (req, res) => {
  Hero.find({'_id': req.params.id}, (err, hero) => {
    if (err) return res.sendError(AppError.status400('No hero found with that ID'));
    res.json(hero);
  });
});

heroRouter.post('/', jsonParser, (req, res) => {
  let newHero = Hero(req.body);
  newHero.save(req.body, (err, hero) => {
    if (err) {
      return res.sendError(AppError.status400('Bad request. Possibly invalid body.'));
    }
    res.json(hero);
  });
});

heroRouter.put('/:id', jsonParser, (req, res) => {
  if (!req.body.name && !req.body.race && !req.body.gender && !req.body.factionId)
    return res.sendError(AppError.status400('Invalid body.'));
  Hero.findOneAndUpdate({'_id': req.params.id}, req.body, (err, hero) => {
    if (err) return res.sendError(AppError.status404('No hero found with that ID'));
    res.json(hero);
  });
});

heroRouter.delete('/:id', jsonParser, (req, res) => {
  Hero.findByIdAndRemove({'_id': req.params.id}, (err) => {
    if (err) return res.sendError(AppError.status404('No hero found with that ID'));
    res.status(204).send({});
  });
});
