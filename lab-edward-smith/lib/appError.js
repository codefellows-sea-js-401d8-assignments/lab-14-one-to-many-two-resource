const AppError = function(message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.err400 = (message) => {
  return new AppError(message, 400, 'invalid body');
};

AppError.err404 = (message) => {
  return new AppError(message, 404, 'no content');
};

AppError.err500 = (message) => {
  return new AppError(message, 500, 'internal server error');
};

module.exports = AppError;
