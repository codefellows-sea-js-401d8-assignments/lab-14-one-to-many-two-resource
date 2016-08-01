'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
const debug = require('debug');
const serverError = debug('cfdemo:servererror');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bears_dev');

const forestRouter = require('./routes/forest_router');
const bearRouter = require('./routes/bear_router');

app.use('/api/forest', forestRouter);
app.use('/api/bear', bearRouter);

app.use((err, req, res, data) => {
  serverError(err);
  res.status(err.statusCode).json(err.message);
});
app.listen(process.env.PORT || 3000, () => console.log('server up'));
