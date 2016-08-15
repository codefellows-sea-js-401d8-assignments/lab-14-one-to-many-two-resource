'use strict';
const express = require('express');
const Genre = require('../model/genre');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug');

let genreMovieRouter = require('./genre-movie-routes');
let genreRouter = express.Router();

genreRouter.route('/all')
  .get((req, res) => {
    Genre.find((err, genre) => {
      if (err) createError(500, 'Internal Server Error');
      res.json(genre);
    });
  });

genreRouter.route('/')
  .post(jsonParser, (req, res) => {
    let genre = new Genre(req.body);
    genre.save((err, genre) => {
      if (err) createError(500, 'Internal Server Error');
      res.json(genre);
    });
  });

genreRouter.route('/:id')
  .get((req, res) => {
    Genre.findOne({'_id': req.params.id}).then((data) => {
      res.json(data);
    });
  })
  .put(jsonParser, (req, res) => {
    let _id = req.params.id;
    debug('PUT request on genre');
    Genre.findByIdAndUpdate(_id, req.body).then(() => {
      res.json('updated');
    });
  })
  .delete((req, res) => {
    Genre.findOne({'_id': req.params.id}).then(() => {
      res.json('deleted');
    });
  });

genreRouter.use('/:genreId/movie', genreMovieRouter);

module.exports = genreRouter;
