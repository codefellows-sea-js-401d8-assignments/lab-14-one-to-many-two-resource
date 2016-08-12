'use strict';
const mongoose = require('mongoose');
const AppError = require('../lib/app_error');
const Hero = require('./hero');

let ZoneSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  continent: {type: String, required:true}
});

ZoneSchema.methods.buildHero = function(heroData, res) {
  let newHero = new Hero(heroData);
  newHero.zoneId = this._id;
  return newHero.save((err, data) => {
    if (err)
      return res.sendError(AppError.status400('Invalid body'));
    res.json(data);
  });
};

ZoneSchema.methods.addHero = function(heroId, res) {
  return Hero.findOneAndUpdate({'_id': heroId}, {zoneId: this._id}, (err, data) => {
    if (err)
      return res.sendError(AppError.status404('Hero not found'));
    if (data === null)
      return res.sendError(AppError.status404('Hero not found'));
    res.json(data);
  });
};

ZoneSchema.methods.removeHero = function(heroId, res) {
  return Hero.findOneAndUpdate({'_id': heroId}, {zoneId: null}, (err) => {
    if (err)
      return res.sendError(AppError.status404('No hero found'));
    res.status(204).send({});
  });
};

ZoneSchema.methods.findAllHeroes = function(res) {
  return Hero.find({zoneId: this._id}, (err, data) => {
    if (err)
      return res.sendError(AppError.status400('Bad request'));
    if (data.length === 0)
      return res.json('There are no heroes in this zone');
    res.json(data);
  });
};

module.exports = exports = mongoose.model('zone', ZoneSchema);
