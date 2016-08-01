'use strict';
const mongoose = require('mongoose');
const Pokemon = require('./pokemon');

let EnvironmentSchema = mongoose.Schema({
  name: {type:String, required:true, unique: true},
  location: String
});

EnvironmentSchema.methods.addPokemon = function(pokemonData) {
  let pokemon = new Pokemon(pokemonData);
  pokemon.envId = this._id;
  return pokemon.save();
};

EnvironmentSchema.methods.updatePokemon = function(pokemonId) {
  return Pokemon.findOneAndUpdate({'_id':pokemonId}, {envId: this._id});
};

EnvironmentSchema.methods.removePokemon = function(pokemonId) {
  return Pokemon.findOneAndUpdate({'_id':pokemonId}, {envId: null});
};

EnvironmentSchema.methods.findAllPokemon = function() {
  return Pokemon.find({envId: this._id});
};

EnvironmentSchema.methods.findOnePokemon = function(pokemonId) {
  return Pokemon.findOne({envId: this._id, _id:pokemonId});
};


module.exports = exports = mongoose.model('environment', EnvironmentSchema);
