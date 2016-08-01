'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookModel = require('./bookModel.js');

const AuthorSchema = new Schema({
  name: {type:String, require:true},
  genre: String

});

AuthorSchema.methods.getAllBooks = function(){
  return BookModel.find({authorId: this._id});
};

AuthorSchema.methods.addBook = function(bookId){
  return BookModel.findOneAndUpdate({_id: bookId}, {authorId: this._id});
};

AuthorSchema.methods.removeBook = function(bookId){
  return BookModel.findOneAndUpdate({'_id': bookId}, {authorId:null});
};

AuthorSchema.methods.createBook = function(book){
  let Book = new BookModel(book);
  Book.authorId = this._id;
  return Book.save();
};

let Author = mongoose.model('Author', AuthorSchema);
module.exports = exports = Author;
