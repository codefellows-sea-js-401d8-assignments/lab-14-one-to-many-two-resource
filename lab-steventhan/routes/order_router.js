'use strict';

const Router = require('express').Router;
const AppError = require('../lib/app_error');
const jsonParser = require('body-parser').json();
const Order = require('../model/order');

let orderRouter = new Router();

orderRouter.get('/all', (req, res, next) => {
  Order.find()
    .then(res.json.bind(res))
    .catch((error) => {
      next(AppError.new500('Internal Server Error', `Server error. ${error.message}`));
    });
});

orderRouter.get('/:id', (req, res, next) => {
  let _id = req.params.id;
  Order.findOne({_id})
    .then((data) => {
      if (!data) return next(AppError.new404('Not Found', `Invalid user id: ${_id} from input.`));
      return res.json(data);
    })
    .catch((error) => {
      next(AppError.new404('Not Found', `Invalid user id: ${_id} from input. ${error.message}`));
    });
});

orderRouter.post('/', jsonParser, (req, res, next) => {
  let parsedJson = req.body;
  if (parsedJson.comment && parsedJson.shippingMethod) {
    Order({
      orderDate: new Date(),
      comment: parsedJson.comment,
      shippingMethod: parsedJson.shippingMethod,
      status: 'Received',
      userId: null
    }).save()
      .then(res.json.bind(res))
      .catch((error) => {
        next(AppError.new400('Bad Request', `${error.message}`));
      });
  }
});

orderRouter.put('/:id', jsonParser, (req, res, next) => {
  let parsedJson = req.body;
  let _id = req.params.id;
  if (parsedJson.comment && parsedJson.shippingMethod) {
    Order.findByIdAndUpdate({_id}, parsedJson)
      .then((data) => {
        if (!data) return next(AppError.new404('Not Found', `Invalid user id: ${_id} from input.`));
        return res.json(data);
      })
      .catch((error) => {
        next(AppError.new404('Not Found', `Invalid user id: ${_id} from input. ${error.message}`));
      });
  } else {
    next(AppError.new400('Invalid JSON', 'Invalid object properties received from put JSON'));
  }
});

orderRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Order.findByIdAndRemove({_id})
    .then((data) => {
      if (!data) return next(AppError.new404('Not Found', `Invalid user id: ${_id} from input.`));
      return res.json(data);
    })
    .catch((error) => {
      next(AppError.new404('Not Found', `Invalid user id: ${_id} from input. ${error.message}`));
    });
});

module.exports = orderRouter;
