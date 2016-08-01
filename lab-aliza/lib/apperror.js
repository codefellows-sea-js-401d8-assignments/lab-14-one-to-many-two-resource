'use strict';

const AppError = function(message, statusCode, resMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.resMessage = resMessage;
};

AppError.prototype.respond = function(res){
  res.status(this.statusCode).json(this.message);
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
