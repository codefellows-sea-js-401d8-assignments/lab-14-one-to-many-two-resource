'use strict';

module.exports = exports = function() {
  return (req, res, next) => {
    res.sendError = function(err) {
      if (!err) return next();
      console.log('error:' + err.message);
      if (err.error.type === 'AppError') {
        res.status(err.error.statusCode).send(err.error.message);
      }
      res.status(500).send('Internal server error');
    };
    next();
  };
};
