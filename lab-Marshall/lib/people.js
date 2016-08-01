'use strict';

const mongoose = require('mongoose');

let People = module.exports = exports = mongoose.model('People', {
  name: {type: String, required: true},
  hobby: {type: String, default: 'vidya games'},
  game: {type: String, default: 'tf2'},
  peopleId: String
});
