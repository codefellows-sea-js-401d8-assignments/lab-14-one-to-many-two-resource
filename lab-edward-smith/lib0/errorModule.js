'use strict';

const errorResponse = () => {
  return (req, res, next) => {
    res.sendError = (err) => {
      res.status(err.statusCode).send(err.responseMessage);
    };
    next();
  };
};

module.exports = errorResponse;
