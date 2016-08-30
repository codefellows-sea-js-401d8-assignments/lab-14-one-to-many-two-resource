'use strict';
const mongoose = require('mongoose');
const Friend = require('./friend');

let CitySchema = mongoose.Schema({
  name: {type: String, required: true, unique: true, default: 'Seattle'},
  state: String
});

CitySchema.methods.makeFriend = function(friendData){
  let friend = new Friend(friendData);
  friend.cityId = this._id;
  return friend.save();
};

CitySchema.methods.addFriend = function(friendId) {
  return Friend.findOneAndUpdate({'_id': friendId}, {cityId: this._id});
};

CitySchema.methods.removeFriend = function(friendId) {
  return Friend.findOneAndUpdate({'_id': friendId}, {cityId: null});
};

CitySchema.methods.findAllFriends = function() {
  return Friend.find({cityId: this._id});
};

module.exports = exports = mongoose.model('city', CitySchema);
