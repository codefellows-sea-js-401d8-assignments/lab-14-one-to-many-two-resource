const mongoose = require('mongoose');
const Hero = require('./hero');

let FactionSchema = mongoose.Schema({
  name: {type: String, required: true},
  continent: String
});

FactionSchema.methods.buildHero = function(heroData) {
  let hero = new Hero(heroData);
  hero.factionId = this._id;
  return hero.save();
};

FactionSchema.methods.addHero = function(heroId) {
  return Hero.findOneAndUpdate({'_id': heroId}, {factionId: this._id});
};

FactionSchema.methods.removeHero = function(heroId) {
  return Hero.findOneAndUpdate({'_id': heroId}, {factionId: null});
};

FactionSchema.methods.findAllHeroes = function() {
  return Hero.find({factionId: this._id});
};

module.exports = exports = mongoose.model('faction', FactionSchema);
