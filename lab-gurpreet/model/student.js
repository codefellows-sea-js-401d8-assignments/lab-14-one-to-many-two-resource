'use strict';

const mongoose = require('mongoose');

let Student = module.exports = exports = mongoose.model('Student', {
  name: {type: String, required: true},
  subjectPreference: {type: String, default: 'coding'},
  favorite: {type: String, default: 'javaScript'},
  schoolId: String
});
