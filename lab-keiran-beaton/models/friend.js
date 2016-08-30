'use strict';
const mongoose = require('mongoose');

let Friend = mongoose.model('Friend', {
  name: {type: String, required: true},
  whenMet: Number,
  gender: String,
  cityId: String
});

module.exports = exports = Friend;
