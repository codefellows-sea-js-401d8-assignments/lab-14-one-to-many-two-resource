'use strict';

const Router = require('express').Router;
const debug = require('debug');
const serverlog = debug('serverlog');
const AppError = require('../lib/apperror');
const Panda = require('../models/pandaschema');
let router = Router();
var bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlParser = bodyParser.urlencoded({
  extended: true
});
router.use(jsonParser);
router.use(urlParser);
const errResponse = require('../lib/errorresponse');

router.get('/', (req, res) => {
  res.send('Panda DB. Enter /api/panda/<id> or /api/all');
});

router.get('/all', (req, res) => {
  Panda.find({})
  .exec((err, pandas) => {
    if (err) return errResponse(AppError.error404('404').respond(res));
    res.status(200).json(pandas);
    serverlog('pandas: ', pandas);
  });
});

router.get('/panda/:id', (req, res) => {
  Panda.findOne({
    _id: req.params.id
  })
  .exec((err, pandas) => {
    if (err) return errResponse(AppError.error404('404').respond(res));
    serverlog('pandas: ', pandas);
    res.status(200).json(pandas);
  });
});

router.post('/panda', jsonParser, (req, res) => {
  let newPanda = new Panda(req.body);
  newPanda.save((err, panda) => {
    if(!req.body.name || !req.body.happy || !req.body.age) return errResponse(AppError.error400('400').respond(res));
    serverlog('panda: ', panda);
    return res.status(200).send(panda);
  });
});

router.put('/panda/:id', jsonParser, (req, res) => {
  Panda.findOneAndUpdate({
    _id: req.params.id
  },
    { $set: {
      name: req.body.name,
      age: req.body.age,
      happy: req.body.happy
    }
  }, {upsert: true}, (err, newPanda) => {
    if (err) return errResponse(AppError.error400('400').respond(res));
    if (!req.params.id) return errResponse(AppError.error404('404').respond(res));
    res.status(200).send(newPanda);
    serverlog('updated panda: ', newPanda);
  });
});

router.delete('/panda/:id', (req, res) => {
  Panda.findOneAndRemove({
    _id: req.params.id
  }, (err, panda) => {
    if(err) return errResponse(AppError.error404('404').respond(res));
    return res.status(204).json(panda);
  });
});

module.exports = router;
