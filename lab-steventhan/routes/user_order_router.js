'use strict';

const Order = require('../model/order');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const AppError = require('../lib/app_error');

let userOrderRouter = new Router();

userOrderRouter.get('/', (req, res, next) => {
  Order.find({userId: req.user._id})
    .then(res.json.bind(res))
    .catch((error) => {
      next(AppError.new500('Internal Server Error', `Server error. ${error.message}`));
    });
});

userOrderRouter.post('/', jsonParser, (req, res, next) => {
  let parsedJson = req.body;
  if (parsedJson.comment && parsedJson.shippingMethod) {
    Order({
      orderDate: new Date(),
      comment: parsedJson.comment,
      shippingMethod: parsedJson.shippingMethod,
      status: 'Received',
      userId: req.user._id
    }).save()
      .then(res.json.bind(res))
      .catch((error) => {
        next(AppError.new400('Bad Request', `${error.message}`));
      });
  }
});

userOrderRouter.put('/:id', (req, res, next) => {
  let _id = req.params.id;
  Order.findByIdAndUpdate({_id}, {userId: req.user.id})
    .then((data) => {
      if (!data) return next(AppError.new404('Not Found', `Invalid user id: ${_id} from input.`));
      return res.json(data);
    })
    .catch((error) => {
      next(AppError.new404('Not Found', `Invalid user id: ${_id} from input. ${error.message}`));
    });
});

userOrderRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Order.findOneAndUpdate({_id}, {userId: null})
    .then((data) => {
      if (!data) return next(AppError.new404('Order Id Not Found', `Invalid user id: ${_id} from input.`));
      return res.json(data);
    })
    .catch((error) => {
      next(AppError.new404('Order Id Not Found', `Invalid user id: ${_id} from input. ${error.message}`));
    });
});

module.exports = userOrderRouter;
