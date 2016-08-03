'use strict';
const mongoose = require('mongoose');
const Student = require('./student');

let schoolSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  location: String
});

schoolSchema.methods.buildAstudent = function(studentData) {
  let student = new Student (studentData);
  student.schoolId = this._id;
  return student.save();
};

schoolSchema.methods.addstudent = function(studentId) {
  return Student.findOneAndUpdate({'_id': studentId}, {schoolId: this._id});
};

schoolSchema.methods.removestudent = function(studentId) {
  return Student.findOneAndUpdate({'_id': studentId}, {schoolId: null});
};

schoolSchema.methods.findAllstudents = function() {
  return Student.find({schoolId: this._id});
};

module.exports = exports = mongoose.model('school', schoolSchema);
