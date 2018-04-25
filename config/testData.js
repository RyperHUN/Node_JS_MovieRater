var mongoose = require('../config/db');
var User = require('../model/User');
var Rating = require('../model/Rating');
var Movie = require('../model/Movie');

var errorHandler= function(err) {
    if(err)
        console.log(err);
}

var createTestData = function() {
    var movieId = new mongoose.mongo.ObjectId();
    Movie.remove({})
        .exec()
        .catch(errorHandler);
    var movieData = new Movie({_id:movieId, name : 'The Matrix'});
    movieData.save(errorHandler);

    User.remove({}).exec().catch(errorHandler);

    var userId = new mongoose.mongo.ObjectId();
    var userData = new User({_id : userId, name : 'Zsolt',
    username:'Zsolt',email:'akormanyzsolt@gmail.com',password:'root', isadmin : true});
    userData.save(errorHandler);

    Rating.remove({}).exec().catch(errorHandler);

    var ratingId = new mongoose.mongo.ObjectId();
    var ratingData = new Rating({_id : ratingId, rating : 8.6,
                movie : movieId, user : userId });
    ratingData.save(errorHandler);
}

module.exports = createTestData;