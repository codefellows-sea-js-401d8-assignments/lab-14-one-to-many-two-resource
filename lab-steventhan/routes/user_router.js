'use strict';

const Router = require('express').Router;

let userRouter = new Router();

userRouter.get('/', (req, res) => {
  res.send('all user');
});

module.exports = userRouter;
