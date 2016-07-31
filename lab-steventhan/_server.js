'use strict';

const server =  require('express')();
const userRouter = require('./routes/user_router');
const orderRouter = require('./routes/order_router');

server.get('/', (req, res) => {
  res.send('For user api, navigate to \'/api/users\'. For order api, navigate to \'/api/orders\'');
});

// Use userRouter at /api/users
server.use('/api/users', userRouter);

// Use orderRouter at /api/orders
server.use('/api/orders', orderRouter);

// 404 handling
server.use((req, res, next) => {
  res.send('404 not found');
  next();
});

// 500 handling
server.use((err, req, res, next) => {
  console.log(err);
  next();
});

module.exports = server;
