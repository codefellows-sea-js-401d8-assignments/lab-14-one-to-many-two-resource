'use strict';
const Friend = require('../models/friend');
const express = require('express');
const jsonParser = require('body-parser').json();
const handleError = require('../lib/handleError');

let friendRouter = module.exports = exports = express.Router();

friendRouter.get('/', (req, res, next) => {
  Friend.find().then(res.json.bind(res), handleError(500, next, 'Server Error'));
});

friendRouter.post('/:id', jsonParser, (req, res, next) => {
  Friend(req.body).save().then(res.json.bind(res), handleError(400, next));
});

friendRouter.put('/:id', jsonParser, (req, res, next) => {
  Friend.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), handleError(400, next));
});

friendRouter.delete('/:id', (req, res, next) => {
  Friend.remove({'_id': req.params.id}).then(res.json.bind(res), handleError(404, next, 'No Such Friend'));
});
