'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
let appFiles = ['./server.js', './lib/*.js', './model/*.js', './route/*.js'];
let testFiles = ['./test/*.js'];

gulp.task('lint:all', () => {
  gulp.src(appFiles)
    .pipe(eslint())
    .pipe(eslint.format());
  gulp.src(testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('nodemon', () => {
  nodemon({ script: './server'})
});

gulp.task('default', ['lint:all', 'mocha']);
