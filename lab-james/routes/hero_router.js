'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const AppError = require('../lib/app_error');
const Hero = require('../model/hero');

let heroRouter = module.exports = exports = express.Router();

heroRouter.get('/all', (req, res) => {
  Hero.find({}, (err, hero) => {
    if (err)
      return res.sendError(AppError.status400('Bad request'));
    if (hero.length === 0)
      return res.json('No heroes exist at this time');
    res.json(hero);
  });
});

heroRouter.get('/:id', (req, res) => {
  Hero.find({'_id': req.params.id}, (err, hero) => {
    if (err)
      return res.sendError(AppError.status404('No hero found'));
    if (hero.length === 0)
      return res.sendError(AppError.status404('No hero found'));
    res.json(hero);
  });
});

heroRouter.post('/', jsonParser, (req, res) => {
  let newHero = Hero(req.body);
  newHero.save((err, hero) => {
    if (err)
      return res.sendError(AppError.status400('Invalid body'));
    res.json(hero);
  });
});

heroRouter.put('/:id', jsonParser, (req, res) => {
  if (!req.body.name && !req.body.race && !req.body.faction)
    return res.sendError(AppError.status400('Invalid body.'));
  Hero.findOneAndUpdate({'_id': req.params.id}, req.body, (err, hero) => {
    if (err)
      return res.sendError(AppError.status404('No hero found'));
    if (hero === null)
      return res.sendError(AppError.status404('No hero found'));
    res.json(hero);
  });
});

heroRouter.delete('/:id', jsonParser, (req, res) => {
  Hero.findByIdAndRemove({'_id': req.params.id}, (err, hero) => {
    if (err)
      return res.sendError(AppError.status404('No hero found'));
    if (hero === null)
      return res.sendError(AppError.status404('No hero found'));
    res.status(204).send({});
  });
});
