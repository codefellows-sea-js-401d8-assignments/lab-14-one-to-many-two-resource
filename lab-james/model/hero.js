'use strict';
const mongoose = require('mongoose');
const uuid = require('node-uuid');

let Hero = module.exports = exports = mongoose.model('Hero', {
  name: {type: String, required: true},
  race: {type: String, required: true},
  gender: {type: String, required: true},
  factionId: {type: String, required: true}
});
