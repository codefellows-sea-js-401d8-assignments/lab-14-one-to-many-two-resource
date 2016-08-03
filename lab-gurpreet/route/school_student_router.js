'use strict';
const School = require('../models/school');
const jsonParser = require('body-parser').json();
const express = require('express');
const HandleError = require('../lib/handle_error');

let schoolStudentRouter = module.exports = exports = express.Router({mergeParams: true});
let findSchool = function(req, res, next) {
  School.findOne({'_id': req.params.schoolId})
  .then((school) => {
    if (!school) return HandleError(404, next)(new Error('School Not Found'));
    req.school = school;
    next();
  }, HandleError(404, next, 'No Such school'));
};

schoolStudentRouter.get('/', findSchool, (req, res, next) => {
  req.school.findAllStudents().then(res.json.bind(res), HandleError(500, next, 'server error'));
});

schoolStudentRouter.post('/', jsonParser, findSchool, (req, res, next) => {
  req.school.buildAStudent(req.body).then(res.json.bind(res), HandleError(400, next));
});

schoolStudentRouter.put('/:id', findSchool, (req, res, next) => {
  req.school.addStudent(req.params.id).then(res.json.bind(res), HandleError(404, next, 'No Such Student'));
});

schoolStudentRouter.delete('/:id', findSchool, (req, res, next) => {
  req.school.removeStudent(req.params.id).then(res.json.bind(res), HandleError(404, next, 'No Such Student'));
});
