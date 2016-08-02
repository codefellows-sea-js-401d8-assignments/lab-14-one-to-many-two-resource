'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  active: Boolean,
  year_added: Number
});

var User = mongoose.model('User', userSchema);
module.exports = User;
