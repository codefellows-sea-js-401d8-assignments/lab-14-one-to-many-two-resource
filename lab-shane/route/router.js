'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const PokeModel = require('../model/pokeModel.js');
const AppError = require('../lib/app_error.js');

let pokeRouter = module.exports = exports = new Router();

pokeRouter.get('/all', (req, res) => {
  PokeModel.find({}, (err, pokemons) => {
    if (err) return (err);
    return res.json(pokemons);
  });
});

pokeRouter.get('/:name', (req, res) => {
  let name = req.params.name;
  PokeModel.findOne({name}, (err, p) => {
    if(p != null){
      if (err) return (err);
      return res.json(p);
    } else{
      return res.sendError(AppError.error404('Pokemon not found!'));
    }
  });
});

pokeRouter.post('/', jsonParser, (req, res) => {
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted.'));
  }
  PokeModel.findOne({name: req.body.name}, (err, p) => {
    if (p == null) {
      let newPokemodel = new PokeModel(req.body);
      newPokemodel.save((err, pokemons) => {
        return res.json(pokemons);
      });
    } else {
      res.sendError(AppError.error400('Pokemon already exists, try a PUT instead.'));
    }
  });
});

pokeRouter.put('/:name', jsonParser, (req, res) => {
  let name = req.params.name;
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted for pokemon ' + req.params.name + '.'));
  }
  PokeModel.findOne({
    name: name
  }, (err, p) => {
    if (p != null) {
      PokeModel.findOneAndUpdate({name: name}, req.body, () => {
        res.send('Pokemon ' + name + ' updated!');
      });
    } else{
      return res.sendError(AppError.error404('Pokemon does not yet exist on server.'));
    }
  });
});

pokeRouter.delete('/:name', (req, res) => {
  let name = req.params.name;
  PokeModel.findOne({name: name}, (err, p) => {
    if (p != null) {
      PokeModel.remove({name}, () =>{
        res.send('Pokemon ' + name + ' was deleted!');
      });
    } else{
      return res.sendError(AppError.error404('Pokemon does not yet exist on server.'));
    }
  });
});

pokeRouter.all('/', (req,res) => {
  return res.sendError(AppError.error400('Unregistered location, please specify a pokemon at pokemon/name.'));
});
