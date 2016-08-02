'use strict';

const errorLib = function(message, statusCode, resMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.resMessage = resMessage;
};

errorLib.prototype.respond = function(res){
  res.status(this.statusCode).json(this.message);
};

errorLib.hasError = function(err){
  return err instanceof errorLib;
};

errorLib.error400 = function(message){
  return new errorLib(message, 400, 'bad request');
};

errorLib.error404 = function(message){
  return new errorLib(message, 404, 'not found');
};

errorLib.error500 = function(message){
  return new errorLib(message, 500, 'internal service error');
};

module.exports = errorLib;
