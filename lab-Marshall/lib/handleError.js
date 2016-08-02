' use strict';

const errorMsg = require('debug')('mydemo:error');

module.exports = exports = function(statusCode, cb, message){
  return function(error){
    message = message || error.message;
    errorMsg(error);
    return cb({error, statusCode, message});
  };
};
