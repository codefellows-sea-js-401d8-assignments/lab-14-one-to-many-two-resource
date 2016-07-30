'use strict';

const server =  require('express')();

server.get('/', (req, res) => {
  res.send('hello world');
});

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
