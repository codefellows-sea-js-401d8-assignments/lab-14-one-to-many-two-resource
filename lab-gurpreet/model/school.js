'use strict';
const mongoose = require('mongoose');
const Student = require('./student');

let schoolSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  location: String
});

schoolSchema.methods.buildAStudent = function(studentData) {
  let student = new Student (studentData);
  student.schoolId = this._id;
  return student.save();
};

schoolSchema.methods.addStudent = function(studentId) {
  return Student.findOneAndUpdate({'_id': studentId}, {schoolId: this._id});
};

schoolSchema.methods.removeStudent = function(studentId) {
  return Student.findOneAndUpdate({'_id': studentId}, {schoolId: null});
};

schoolSchema.methods.findAllStudents = function() {
  return Student.find({schoolId: this._id});
};

module.exports = exports = mongoose.model('school', schoolSchema);
