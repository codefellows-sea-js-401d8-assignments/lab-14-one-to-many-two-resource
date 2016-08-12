'use strict';
const mongoose = require('mongoose');

let Hero = module.exports = exports = mongoose.model('Hero', {
  name: {type: String, required: true},
  race: {type: String, required: true},
  faction: {type: String, required: true},
  zoneId: String
});
