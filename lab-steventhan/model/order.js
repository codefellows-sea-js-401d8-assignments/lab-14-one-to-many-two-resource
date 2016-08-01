'use strict';

const mongoose = require('mongoose');

let Order = mongoose.model('Order', mongoose.Schema({
  orderDate: Date,
  comment: String,
  shippingMethod: String,
  status: String,
  userId: String
}));

module.exports = Order;
