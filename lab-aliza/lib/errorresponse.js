'use strict';

const Error = require('./apperror');

const errorResponse = function() {
  return (err, req, res, next) => {
    if (Error.hasError(err)){ res.status(err.statusCode).send(err.resMessage);
    }
    res.status(500).send('500 internal server error');
    next();
  };
};

module.exports = errorResponse;
