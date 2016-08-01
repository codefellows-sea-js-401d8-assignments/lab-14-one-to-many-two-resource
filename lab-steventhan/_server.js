'use strict';

const server =  require('express')();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const userRouter = require('./routes/user_router');
const orderRouter = require('./routes/order_router');
const errorResponse = require('./lib/error_response');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db');

server.get('/', (req, res) => {
  res.send('For user api, navigate to \'/api/users\'. For order api, navigate to \'/api/orders\'');
});

server.use(errorResponse);

// Use userRouter at /api/users
server.use('/api/users', userRouter);

// Use orderRouter at /api/orders
server.use('/api/orders', orderRouter);

// 404 handling
server.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    msg: 'Not Found'
  });
  next();
});

// 500 handling
server.use((err, req, res, next) => {
  res.sendError(err);
  next(err);
});

module.exports = server;
