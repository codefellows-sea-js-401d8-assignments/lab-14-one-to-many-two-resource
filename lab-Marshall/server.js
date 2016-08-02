'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
const debug = require('debug');
const serverError = debug('cfdemo:servererror');

const cityRouter = require('./route/cityRouter');
const peopleRouter = require('./route/peopleRouter');
const authRouter = require('./route/authRouter');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/people_dev');


app.use('/api/city', cityRouter);
app.use('/api/people', peopleRouter);
app.use('/api/signup', authRouter);

app.use((err, req, res, data) => {
  serverError(err);
  res.status(err.statusCode).json(err.message);
});

app.listen(process.env.PORT || 3000, () => console.log('Server up on 3000'));
