'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Promise = require('./lib/promise');
const AppError = require('./lib/app_error');
const errorResponse = require('./lib/error_response');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/wow_db');

const heroRouter = require('./routes/hero_router');
// const zoneRouter = require('./routes/zoneRouter');

app.use(errorResponse());
app.use(morgan('dev'));
app.use('/api/hero', heroRouter);
// app.use('/api/zone', zoneRouter);

app.use((req, res) => {
  return res.sendError(AppError.status404('page not found'));
});

app.listen(3000, () => console.log('server is up'));
