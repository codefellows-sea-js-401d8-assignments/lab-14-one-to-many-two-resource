'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require(__dirname + '/route/router.js');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;
const port = 3000;

mongoose.connect(DB_SERVER);

app.use('/api', router);

app.listen(port, () => {
  console.log('app listening on port ' + port);
});

module.exports = app;
