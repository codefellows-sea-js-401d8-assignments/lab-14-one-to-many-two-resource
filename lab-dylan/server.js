'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errResponse = require('./lib/error_response');
const debug = require('debug');
const serverError = debug('lab14:servererror');

const envRouter = require('./route/env-router');
const pokemonRouter = require('./route/pokemon-router');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use(errResponse());
app.use(morgan('dev'));

app.use('/api/environment', envRouter);
app.use('/api/pokemon', pokemonRouter);

app.use((err, req, res, data) => {
  serverError('error: ' + err + '. Next = ' + data);
  res.status(err.statusCode).json(err.message);
});


module.exports = app;
