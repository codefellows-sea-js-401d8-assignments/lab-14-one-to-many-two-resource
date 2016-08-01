'use strict';

let AppError = module.exports = exports = function(message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.isAppError = function(err) {
  return err instanceof AppError;
};

AppError.status400 = function(error) {
  return new AppError('bad request', 400, error);
};

AppError.status404 = function(error) {
  return new AppError('page not found', 404, error);
};

AppError.status500 = function(error) {
  return new AppError('internal error', 500, error);
};
