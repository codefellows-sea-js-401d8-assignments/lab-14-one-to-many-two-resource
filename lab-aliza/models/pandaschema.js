'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PandaSchema = new Schema({
  name: String,
  age: Number,
  happy: Boolean,
  partyId: String
});

module.exports = exports = mongoose.model('Panda', PandaSchema);
