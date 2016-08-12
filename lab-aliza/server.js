'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
const pandaRouter = require('./routes/pandarouter');
const partyRouter = require('./routes/partyrouter');
let port = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/dev');

app.use('/api/panda', pandaRouter);
app.use('/api/party', partyRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
  next();
});

app.listen(port, () => console.log('server up on ' + port));
