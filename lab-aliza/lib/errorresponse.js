'use strict';

const Error = require('./AppError');

const errResponse = function() {
  return (req, res, next) => {
    res.sendError = (err) => {
      if (Error.hasError(err)) {
        return res.status(err.statusCode).send(err.resMessage);
      }
      return res.status(500).send(err.message);
    };
    next();
  };
};

module.exports = exports = errResponse;
