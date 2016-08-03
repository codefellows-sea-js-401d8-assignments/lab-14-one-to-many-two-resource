'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
const debug = require('debug');
const serverError = debug('cfdemo;servererror');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/students_dev');

const schoolRouter = require('./route/schoolRouter.js');
const studentRouter = require('./route/studentRouter.js');


app.use('/api/school', schoolRouter);
app.use('/api/student', studentRouter);
app.use((err, req, res, next) => {
  serverError(err);
  next();
  res.status(err.statusCode).json(err.message);
});

app.listen(process.env.PORT || 3000, () => console.log('server up'));
