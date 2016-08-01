' use strict';

module.exports = exports = function(statusCode, cb, message){
  return function(error){
    message = message || error.message;
    return cb({error, statusCode, message});
  };
};
