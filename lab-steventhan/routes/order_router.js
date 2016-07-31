'use strict';

const Router = require('express').Router;

let orderRouter = new Router();

orderRouter.get('/', (req, res) => {
  res.send('order router');
});

module.exports = orderRouter;
