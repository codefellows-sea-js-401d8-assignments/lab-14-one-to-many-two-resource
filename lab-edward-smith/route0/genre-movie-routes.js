'use strict';
const Genre = require('../model/genre');
const jsonParser = require('body-parser').json();
const express = require('express');
const createError = require('http-errors');

let genreMovieRouter = express.Router({mergeParams: true});
let findGenre = function(req, res, next) {
  Genre.findOne({'_id': req.params.genreId}, function(err, genre) {
    if (err) createError(500, 'Internal Server Error');
    req.genre = genre;
    next();
  });
};

genreMovieRouter.get('/', findGenre, (req, res) => {
  req.genre.findAllMovies().then(res.json.bind(res));
});

genreMovieRouter.post('/', jsonParser, findGenre, (req, res) => {
  req.genre.addNewMovie(req.body).then(res.json.bind(res), createError(400, 'bad request'));
});

genreMovieRouter.put('/:id', jsonParser, findGenre, (req, res) => {
  req.genre.addMovie(req.params.id).then(res.json.bind(res), createError(400, 'bad request'));
});

genreMovieRouter.delete('/:id', findGenre, (req, res) => {
  req.genre.removeMovie(req.params.id).then(res.json.bind(res), createError(400, 'bad request'));
});

module.exports = exports = genreMovieRouter;
