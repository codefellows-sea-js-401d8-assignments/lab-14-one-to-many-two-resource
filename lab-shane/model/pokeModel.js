'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokeSchema = new Schema({
  name: String,
  type: String
});

let Pokemon = mongoose.model('Pokemon', pokeSchema);
module.exports = exports = Pokemon;
