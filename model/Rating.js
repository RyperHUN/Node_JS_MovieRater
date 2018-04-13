
var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Rating = db.model('Rating', {
    _id : Schema.Types.ObjectId,
    movie : {type : Schema.Types.ObjectId, ref: 'Movie'},
    user : {type : Schema.Types.ObjectId, ref : 'User'},
    rating : Number
  });

module.exports = Rating;