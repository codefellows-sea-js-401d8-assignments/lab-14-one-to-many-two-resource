'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const morgan = require('morgan');
const router = require(__dirname + '/route/router.js');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_server || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use('/api', router);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
  next(err);
});

app.use((req, res) => {
  let message = 'route not found';
  res.status(404).json({
    message
  });
});

module.exports = app.listen(3000, () => {
  console.log('server up');
});

// module.exports = app;
