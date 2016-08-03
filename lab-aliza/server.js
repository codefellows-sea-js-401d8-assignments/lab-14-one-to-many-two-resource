'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pandaRouter = require(__dirname + '/routes/pandarouter.js');
const partyRouter = require(__dirname + '/routes/partyrouter.js');
const Promise = require('./lib/promise');
mongoose.Promise = Promise;
const debug = require('debug');
const serverError = debug('serverError');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;
const port = 3000;

mongoose.connect(DB_SERVER);

app.use('/api/panda', pandaRouter);
app.use('/api/party', partyRouter);

app.use((err, req, res, next) => {
  serverError(err);
  res.status(err.statusCode).json(err.message);
  next();
});

app.listen(port, () => console.log('server up'));

module.exports = app;
