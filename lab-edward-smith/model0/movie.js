'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  director: String,
  box_office: Number,
  genreId: String
});

module.exports = mongoose.model('Movie', MovieSchema);
