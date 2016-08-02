'use strict';
const mongoose = require('mongoose');
const user = require('./userschema');

let studentSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  location: String
});

studentSchema.methods.makeuser = function(userData) {
  let user = new (userData);
  user.studentId = this._id;
  return user.save();
};

studentSchema.methods.adduser = function(userId) {
  return user.findOneAndUpdate({'_id': userId}, {studentId: this._id});
};

studentSchema.methods.removeuser = function(userId) {
  return user.findOneAndUpdate({'_id': userId}, {studentId: null});
};

studentSchema.methods.findAlluser = function() {
  return user.find({studentId: this._id});
};

module.exports = exports = mongoose.model('student', studentSchema);
