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
const errorResponse = require('./model/errorresponse');
const AppError = require('./model/AppError');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;
const port = 3000;

mongoose.connect(DB_SERVER);
app.use(errorResponse());
app.use('/api/panda', pandaRouter);
app.use('/api/party', partyRouter);

app.use((req, res) => {
  serverError('error 404');
  res.sendError(AppError.error404('not found'));
});

app.listen(port, () => console.log('server up'));

module.exports = app;
