'use strict';
const mongoose = require('mongoose');
const Panda = require('./pandaschema');

let PartySchema = mongoose.Schema({
  theme: String,
  location: String
});

PartySchema.methods.makePanda = function(pandaData) {
  let panda = new Panda(pandaData);
  Panda.partyId = this._id;
  return panda.save();
};

PartySchema.methods.addPanda = function(pandaId) {
  return Panda.findOneAndUpdate({'_id': pandaId}, {partyId: this._id});
};

PartySchema.methods.removePanda = function(pandaId) {
  return Panda.findOneAndUpdate({'_id': pandaId}, {partyId: null});
};

PartySchema.methods.findAllPandas = function() {
  return Panda.find({partyId: this._id});
};

module.exports = exports = mongoose.model('party', PartySchema);
