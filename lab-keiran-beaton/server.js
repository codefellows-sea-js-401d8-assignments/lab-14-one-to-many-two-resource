'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
const debug = require('debug');
const serverError = debug('lab:servererror');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:/lab_dev');

const cityRouter = require('./routes/cityRouter');
const friendRouter = require('./routes/friendsRouter');

app.use('/api/city', cityRouter);
app.use('/api/friend', friendRouter);


app.use((err, req, res, data) => {
  serverError(err);
  res.status(err.statusCode).json(err.message);
  console.log('data', data);
});

app.listen(process.env.PORT || 3000, () => console.log('Server is up'));
