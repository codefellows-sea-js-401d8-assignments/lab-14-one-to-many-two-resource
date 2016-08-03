'use strict';

let AppError = function(message, statusCode, resMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.resMessage = resMessage;
};

AppError.hasError = function(err){
  return err instanceof AppError;
};

AppError.error400 = function(message){
  return new AppError(message, 400, 'bad request');
};

AppError.error404 = function(message){
  return new AppError(message, 404, 'not found');
};

AppError.error500 = function(message){
  return new AppError(message, 500, 'internal service error');
};

module.exports = AppError;
