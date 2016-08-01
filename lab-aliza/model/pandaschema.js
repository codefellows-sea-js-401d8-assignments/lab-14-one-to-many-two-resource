'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PandaSchema = new Schema({
  name: String,
  age: Number,
  happy: Boolean
});

module.exports = exports = mongoose.model('Panda', PandaSchema);
