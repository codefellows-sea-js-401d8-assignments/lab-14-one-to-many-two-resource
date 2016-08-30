'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cityRouter = require('../routes/cityRouter');
const friendsRouter = require('../routes/friendsRouter');

mongoose.connect('mongodb://localhost/test_db');

app.use(morgan('dev'));
app.use('/api/friend', friendsRouter);
app.use('/api/city', cityRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
});

app.listen(3000);
