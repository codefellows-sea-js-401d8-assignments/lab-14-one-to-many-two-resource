'use strict';

const Router = require('express').Router;
const User = require('../model/user');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const jsonParser = require('body-parser').json();
const AppError = require('../lib/app_error');

let userRouter = new Router();

userRouter.get('/all', (req, res) => {
  User.find()
    .then(res.json.bind(res));
});

userRouter.get('/:id', (req, res, next) => {
  let _id = req.params.id;
  User.find({_id})
    .then(res.json.bind(res))
    .catch((error) => {
      next(AppError.new404('Not Found', `Invalid user id from input. ${error.message}`));
    });
});

userRouter.post('/', jsonParser, (req, res, next) => {
  let parsedJson = req.body;
  if (parsedJson.firstName && parsedJson.lastName && parsedJson.email) {
    User(parsedJson).save()
      .then(res.json.bind(res))
      .catch((error) => {
        next(AppError.new400('Bad Request', `${error.message}`));
      });
  } else {
    next(AppError.new400('Invalid JSON', 'Invalid object properties received from posted JSON'));
  }
});

userRouter.put('/:id', jsonParser, (req, res, next) => {
  let parsedJson = req.body;
  let _id = req.params.id;
  if (parsedJson.firstName && parsedJson.lastName && parsedJson.email) {
    User.findOneAndUpdate({_id}, parsedJson)
      .then(res.json.bind(res))
      .catch((error) => {
        next(AppError.new404('Not Found', `Invalid user id from input. ${error.message}`));
      });
  } else {
    next(AppError.new400('Invalid JSON', 'Invalid object properties received from put JSON'));
  }
});

module.exports = userRouter;
