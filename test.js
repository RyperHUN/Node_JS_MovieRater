var errorHandler = function(err) {
  if(err)
    console.log(err);
}

var mongoose = require('mongoose');
//mongoose.set('bufferCommands', false);
mongoose.connect('mongodb://localhost:27017/test', errorHandler);
mongoose.connection.once('open',function () {
  console.log('Connected');
}).on('error',function (error) {
  console.log('CONNECTION ERROR:',error);
});
//module.exports = mongoose;

//var Schema = require('mongoose').Schema;
//var db = require('../config/db');
var Schema = mongoose.Schema;

//Stores movie data like name, id etc [movieId, name]
//Stores a rating data [userid, moveiId,rating]
//Stores user id etc [userId, name, username,pw, isAdmin]


  
var User = mongoose.model('User', {
    _id : Schema.Types.ObjectId,
    name : String,
    username : String,
    password : String,
    isAdmin : Boolean
});

var Movie = mongoose.model('Movie', {
  _id : Schema.Types.ObjectId,
  name : String
});

var Rating = mongoose.model('Rating', {
  _id : Schema.Types.ObjectId,
  movie : {type : Schema.Types.ObjectId, ref: 'Movie'},
  user : {type : Schema.Types.ObjectId, ref : 'User'},
  rating : Number
});



var movieId = new mongoose.mongo.ObjectId();
///TODO Export modules
//module.exports = Task;


//Removes all items

// Movie.remove({})
//       .exec()
//       .catch(errorHandler);
// var movieData = new Movie({_id:movieId, name : 'The Matrix'});
// movieData.save(errorHandler);

// User.remove({}).exec().catch(errorHandler);

// var userId = new mongoose.mongo.ObjectId();
// var userData = new User({_id : userId, name : 'Zsolt',
// username:'Zsolt',password:'root', isadmin : true});
// userData.save(errorHandler);

// Rating.remove({}).exec().catch(errorHandler);

// var ratingId = new mongoose.mongo.ObjectId();
// var ratingData = new Rating({_id : ratingId, rating : 8.6,
//              movie : movieId, user : userId });
// ratingData.save(errorHandler);


Rating.find({}).populate('user').exec(function (err, result){
  if(err) console.log(err);
  console.log(result);
});

Rating.find({}).populate('user').populate('movie')
.exec(function (err, result){
  if(err) console.log(err);
  console.log(result);
});