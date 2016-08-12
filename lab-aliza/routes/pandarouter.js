
'use strict';

const Router = require('express').Router;
const HandleError = require('../lib/apperror');
const PandaSchema = require('../models/pandaschema');
const jsonParser = require('body-parser').json();
let pandaRouter = Router();

pandaRouter.post('/newpanda', jsonParser, (req, res, next) => {
  let newPanda = new PandaSchema({'name': req.body.name, 'age': req.body.age, 'happy': req.body.happy});
  newPanda.save((err, pandaData) => {
    if (err) return next(err);
    res.send(pandaData);
  });
});

pandaRouter.get('/:pandaid', (req, res, next) => {
  let DBError = HandleError(400, next, 'invalid id');
  let Err404 = HandleError(404, next);
  PandaSchema.findOne({'_id': req.params.pandaid}).then((data) => {
    if (!data) return next(Err404(new Error('Panda not found.')));
    res.json(data);
  }, DBError);
});

pandaRouter.get('/allpandas', (req, res, next) => {
  PandaSchema.find().then(res.json.bind(res), HandleError(500, next, 'Server Error'));
});

module.exports = exports = pandaRouter;
