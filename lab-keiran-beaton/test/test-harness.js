'use strict';
const mongoose = require('mongoose');
const Promise = require('../lib/promise');
mongoose.Promise = Promise;

require('./test-server');
require('./city-test');
require('./friend-test');
require('./city-friends-test');

process.on('exit', (code) => {
  mongoose.connection.db.dropDatabase(() => console.log('db dropped', code));
});
