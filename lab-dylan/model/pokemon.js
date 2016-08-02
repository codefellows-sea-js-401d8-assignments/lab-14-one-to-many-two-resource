'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: {type:String, required:true},
  element: String,
  number: Number,
  envId : String
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;
