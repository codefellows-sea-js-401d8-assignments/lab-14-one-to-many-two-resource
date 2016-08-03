'use strict';

const express = require('express');
const School = require('../model/school');
const jsonParser = require('body-parser').json();
const HandleError = require('../lib/handle_error');

let schoolStudentRouter = require('./school_student_router');
let schoolRouter = module.exports = exports = express.Router();

schoolRouter.get('/', (req, res, next) => {
  let handleDbError = HandleError(500, next, 'Database Error');
  School.find().then(res.json.bind(res), handleDbError);
});

schoolRouter.get('/:id', (req, res, next) => {
  let handleDbError = HandleError(400, next, 'invalid id');
  let fourOhFour = HandleError(404, next);
  School.findOne({'_id': req.params.id}).then((data) => {
    if (!data) return next(fourOhFour(new Error('School not found.')));
    res.json(data);
  }, handleDbError);
});

schoolRouter.post('/', jsonParser, (req, res, next) => {
  let handleBadValidation = HandleError(400, next);
  (School(req.body)).save().then(res.json.bind(res), handleBadValidation);
});

schoolRouter.put('/:id', jsonParser, (req, res, next) => {
  (School.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), HandleError(400, next)));
});

schoolRouter.delete('/:id', (req, res, next) => {
  (School.remove({'_id': req.params.id})).then(res.json.bind(res), HandleError(400, next, 'Bad _id'));
});

schoolRouter.use('/:schoolId/student', schoolStudentRouter);
