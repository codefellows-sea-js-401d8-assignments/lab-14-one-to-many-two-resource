'use strict';
const Student = require('../model/student');
const express = require('express');
const jsonParser = require('body-parser').json();
const HandleError = require('../lib/handle_error');

let studentRouter = module.exports = exports = express.Router();

studentRouter.get('/', (req, res, next) => {
  Student.find().then(res.json.bind(res), HandleError(500, next, 'Server Error'));
});

studentRouter.post('/', jsonParser, (req, res, next) => {
  Student(req.body).save().then(res.json.bind(res), HandleError(400, next));
});

studentRouter.put('/:id', jsonParser, (req, res, next) => {
  Student.findOneAndUpdate({'_id': req.params.id}, req.body)
    .then(res.json.bind(res),
      HandleError(400, next));
});

studentRouter.delete('/:id', jsonParser, (req, res, next) => {
  Student.remove({'_id': req.params.id}).then(res.json.bind(res), HandleError(404, next, 'No Such Student'));
});
