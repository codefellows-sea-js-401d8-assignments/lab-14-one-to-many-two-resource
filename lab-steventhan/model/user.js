'use strict';

const mongoose = require('mongoose');

let User = mongoose.model('User', mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: String
}));

module.exports = User;
