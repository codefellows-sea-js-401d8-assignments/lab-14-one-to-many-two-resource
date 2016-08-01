'use strict';
const mongoose = require('mongoose');

let Friend = module.exports = exports = mongoose.model('Friend', {
  name: {type: String, required: true},
  whenMet: Number,
  gender: String,
  cityId: String
});
