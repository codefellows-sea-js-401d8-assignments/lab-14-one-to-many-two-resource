'use strict';

const express = require('express');
const router = express.Router();
const Movie  = require('../model/movie');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const AppError = require('../lib/AppError');
const debug = require('debug')(router);

router.route('/all')
  .get((req, res) => {
    debug('get req for all called');
    Movie.find((err, movies) => {
      if (err) return res.sendError(AppError.err500('internal server error'));
      res.json(movies);
    });
  });

router.route('/')
  .post(jsonParser, (req, res) => {
    debug('post request called');
    if (!req.body.title || !req.body.director || !req.body.box_office) {
      return res.sendError(AppError.err400('invalid body'));
    }
    let newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
      if (err) return res.sendError(AppError.err500('internal server error'));
      res.json(movie);
    });
  });

router.route('/:id')
  .get((req, res) => {
    debug('get REQ for :id');
    let _id = req.params.id;
    Movie.findById(_id, (err, movie) => {
      if (!movie) return res.sendError(AppError.err404('no content'));
      res.json(movie);
    });
  })
  .put(jsonParser, (req, res) => {
    let _id = req.params.id;
    debug('put req ');
    if (!req.body.title || !req.body.director || !req.body.year_released) {
      return res.sendError(AppError.err400('no body'));
    }
    Movie.findOneAndUpdate(_id, req.body, (err) => {
      if (err) return res.sendError(AppError.err400('no id'));
      res.json('updated');
    });
  })
  .delete((req, res) => {
    let _id = req.params.id;
    Movie.findOneAndRemove(_id, (err) => {
      if (err) console.log(err);
      res.json({
        message: 'deleted'
      });
    });
  });

module.exports = router;
