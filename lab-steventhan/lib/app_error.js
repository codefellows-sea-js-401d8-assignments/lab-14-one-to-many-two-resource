'use strict';

let AppError = function(statusCode, clientMessage, serverMessage) {
  this.statusCode = statusCode;
  this.clientMessage = clientMessage;
  this.serverMessage = serverMessage;
};

AppError.new404 = function(clientMessage, serverMessage) {
  return new AppError(404, clientMessage, serverMessage);
};

AppError.new400 = function(clientMessage, serverMessage) {
  return new AppError(400, clientMessage, serverMessage);
};

AppError.new500 = function(clientMessage, serverMessage) {
  return new AppError(500, clientMessage, serverMessage);
};

module.exports = AppError;
