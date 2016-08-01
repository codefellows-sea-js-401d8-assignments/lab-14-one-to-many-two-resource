'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const AuthorModel = require('../model/authorModel.js');
const AppError = require('../lib/app_error.js');

let authorBookRouter = module.exports = exports = express.Router({
  mergeParams: true
});
let findAuthor = function(req, res, next) {
  AuthorModel.findOne({name: req.params.name}).then((author) => {
    if (!author) return res.sendError(AppError.error404('Author not found.'));
    req.author = author;
    next();
  });
};

authorBookRouter.get('/', findAuthor, (req, res) => {
  req.author.getAllBooks().then((book) => {
    console.log(req.author);
    if (!book) return res.sendError(AppError.error404('Author has no associated books.'));
    res.json(book);
  });
});

authorBookRouter.post('/', jsonParser, findAuthor, (req, res) => {
  req.author.createBook(req.body).then((book) => {
    if (!book) return res.sendError(AppError.error400('No book data inputted.'));
    res.json(book);
  });
});

authorBookRouter.put('/:id', jsonParser, findAuthor, (req, res) => {
  req.author.addBook(req.params.id).then((book) => {
    if (!book) return res.sendError(AppError.error404('Book not found.'));
    res.status(200).json({msg:'success!'});
  });
});

authorBookRouter.delete('/:id', findAuthor, (req, res) => {
  req.author.removeBook(req.params.id).then((book) => {
    if (!book) return res.sendError(AppError.error404('Book not found.'));
    res.status(200).json({msg:'success!'});
  });
});
