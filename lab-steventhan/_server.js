'use strict';

const server =  require('express')();
const mongoose = require('mongoose');
const userRouter = require('./routes/user_router');
const orderRouter = require('./routes/order_router');
const errorResponse = require('./lib/error_response');

mongoose.connect('mongodb://localhost/dev_db');

server.get('/', (req, res) => {
  res.send('For user api, navigate to \'/api/users\'. For order api, navigate to \'/api/orders\'');
});

// Use userRouter at /api/users
server.use('/api/users', userRouter);

// Use orderRouter at /api/orders
server.use('/api/orders', orderRouter);

server.use(errorResponse);

// 404 handling
server.use((req, res, next) => {
  res.send('404 not found');
  next();
});

// 500 handling
server.use((err, req, res, next) => {
  res.sendError(err);
});

module.exports = server;
