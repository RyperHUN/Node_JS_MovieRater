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

    var movieId2 = new mongoose.mongo.ObjectId();
    var movieData2 = new Movie({_id:movieId2, name : 'Black butterfly'});
    movieData2.save(errorHandler);
    var userId2 = new mongoose.mongo.ObjectId();
    var userData2 = new User({_id : userId2, name : 'Zsofi',
    username:'Zsofi', email:'zsofi@gmail.com', password:'test', isadmin : false});
    userData2.save(errorHandler);

    var ratingId2 = new mongoose.mongo.ObjectId();
    var ratingData2 = new Rating({_id:ratingId2, rating : 10,
    movie: movieId, user: userId2});
    ratingData2.save(errorHandler);
    var ratingData3 = new Rating({_id: new mongoose.mongo.ObjectId(), 
    rating: 5.3, movie: movieId2, user: userId2});
    ratingData3.save(errorHandler);
}

module.exports = createTestData;