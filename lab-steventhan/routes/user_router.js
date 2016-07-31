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

userRouter.post('/', jsonParser, (req, res, next) => {
  let parsedJson = req.body;
  if (parsedJson.firstName && parsedJson.lastName && parsedJson.email) {
    User(req.body).save()
      .then(res.json.bind(res));
  } else {
    next(AppError.new400('Invalid JSON', 'Invalid JSON received from post request'));
  }
});

module.exports = userRouter;
