'use strict';
const mongoose = require('mongoose');
const Hero = require('./hero');

let ZoneSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  continent: {type: String, required:true}
});

ZoneSchema.methods.buildHero = function(heroData) {
  let hero = new Hero(heroData);
  hero.zoneId = this._id;
  return hero.save();
};

ZoneSchema.methods.addHero = function(heroId) {
  return Hero.findOneAndUpdate({'_id': heroId}, {zoneId: this._id});
};

ZoneSchema.methods.removeHero = function(heroId) {
  return Hero.findOneAndUpdate({'_id': heroId}, {zoneId: null});
};

ZoneSchema.methods.findAllHeroes = function() {
  return Hero.find({zoneId: this._id});
};

module.exports = exports = mongoose.model('faction', ZoneSchema);
