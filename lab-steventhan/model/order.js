'use strict';

const mongoose = require('mongoose');

let Order = mongoose.model('Order', mongoose.Schema({
  orderDate: Date,
  shippingMethod: String,
  userId: String
}));

module.exports = Order;
