'use strict';

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const morgan = require('morgan');
const pokemonServer = 'mongodb://localhost/pokemon';
const testServer = process.env.mongoTestServer || pokemonServer;
const pokeRouter = require('../route/router.js');
const resError = require('./response_error.js');

let server = module.exports = exports = express();

let accessLogStream = fs.createWriteStream('./access.log', {
  flags: 'a'
});

server.use(morgan('combined', {
  stream: accessLogStream
}));

mongoose.connect(testServer);

server.use(resError);

server.use('/api/pokemon', pokeRouter);
