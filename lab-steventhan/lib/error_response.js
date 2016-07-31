'use strict';

const AppError = require('./app_error');
const serverLog = require('debug')('serverlog:error-response');

let errorResponse = (req, res, next) => {
  res.sendError = (error) => {
    if (error instanceof AppError) {
      serverLog(error.serverMessage);
      return res.status(error.statusCode).json({
        status: error.statusCode,
        msg: error.clientMessage
      });
    }
    serverLog(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal Server Error'
    });
  };
  next();
};

module.exports = errorResponse;
