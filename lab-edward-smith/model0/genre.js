'use strict';
const mongoose = require('mongoose');
const Movie = require('./movie');

let GenreSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true}
});

GenreSchema.methods.addNewMovie = function(movieData) {
  let movie = new Movie(movieData);
  movie.genreId = this._id;
  return movie.save();
};

GenreSchema.methods.addMovie = function(movieId) {
  return Movie.findOneAndUpdate({'_id': movieId}, {genreId: this._id});
};

GenreSchema.methods.removeMovie = function(movieId) {
  return Movie.findOneAndUpdate({'_id': movieId}, {genreId: null});
};

GenreSchema.methods.findAllMovies = function() {
  return Movie.find({genreId: this._id});
};

module.exports = exports = mongoose.model('genre', GenreSchema);
