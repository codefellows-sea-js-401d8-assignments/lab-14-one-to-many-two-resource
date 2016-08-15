'use strict';

const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
const movieRouter = require('./route/movie-routes');
const genreRouter = require('./route/genre-routes');
const morgan = require('morgan');
const debug = require('debug');

const LOCAL_DB = 'mongodb://localhost/movie_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB;

mongoose.Promise = Promise;
mongoose.connect(DB_SERVER);

app.use(morgan('dev'));

app.use('/api/movie', movieRouter);
app.use('/api/genre', genreRouter);

app.all('*', (req, res) => {
  debug('404 on all');
  res.status(404).send('not found');
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
  next();
});

const server = app.listen(3000, () => console.log('server up on 3000'));

module.exports = server;
