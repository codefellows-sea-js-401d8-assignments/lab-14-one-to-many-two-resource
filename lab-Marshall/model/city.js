'use strict';

const mongoose = require('mongoose');

let City = module.exports = exports = mongoose.model('City', {
  name: {type: String, required: true},
  cityId: String
});
