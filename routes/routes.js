//Middleware includes
var loginMW = require ('../middleware/login.js');
var logoutMW = require ('../middleware/logout.js');
var forgotpwMW = require ('../middleware/forgotpw.js');
var authMW = require ('../middleware/auth.js');
var deleteRatingsMW = require ('../middleware/rate/deleteRatings.js');
var getRatingsMW = require ('../middleware/rate/getRatings.js');
var modifyRatingMW = require ('../middleware/rate/modifyRating.js');

var getMoviesMW = require('../middleware/movie/getMovie.js');
var addMovieMW = require('../middleware/movie/addMovie.js');

var getUsers = require('../middleware/user/getUsers.js');

var movieModel = {}; //Stores movie data like name, id etc [movieId, name]
var ratingModel = {}; //Stores a rating data [userid, moveiId,rating]
var userModel = {}; //Stores user id etc [userId, name, username,pw, isAdmin]

//Ez az amit kiajanlok masok szamara
module.exports = function (app) {
    var objectRepository = {
        movieModel: movieModel,
        ratingModel: ratingModel,
        userModel: userModel
    };

    //Delete ratings for film id
    app.use('/rates/del/:film_id',
        authMW(objectRepository), //TODO Maybe authAdmin
        getRatingsMW(objectRepository),
        deleteRatingsMW(objectRepository)
    );
    //Get ratings by movie id
    app.use('/rates/:film_id',
        authMW(objectRepository),
        getRatingsMW(objectRepository)
    );
    ///FOR These you need to be logged in
    //Delete rating for film id
    app.use('/rate/del/:film_id',
        authMW(objectRepository),
        getRatingsMW(objectRepository),
        deleteRatingsMW(objectRepository)
    );
    //Search rating by movie id
    app.use('/rate/mod/:film_id',
        authMW(objectRepository),
        getRatingsMW(objectRepository),
        modifyRatingMW(objectRepository)
    );

    //Search movie by id
    app.use('/movies/search/:id',
        getMoviesMW(objectRepository)
    );
    //Search movie by name
    app.use('/movies/search/:name',
        getMoviesMW(objectRepository)
    );
    //Adds a movie 
    app.use('/movies/add',
        authMW(objectRepository),
        getMoviesMW(objectRepository), //Check if movie exists
        addMovieMW(objectRepository)
    );
    //Lists all movies
    app.use('/movies',
        getMoviesMW(objectRepository)
    );
    
    app.use('/logout',
        logoutMW(objectRepository)
    );
    //A new password can be generated to the username
    app.use('/forgotpw',
        forgotpwMW(objectRepository)
    );
    //List specific user data 
    app.use('/user/:id',
        authMW(objectRepository),
        getUsers(objectRepository)
    );
    //List users
    app.use('/users',
        authMW(objectRepository),
        getUsers(objectRepository)
    );
    app.use('/',
        function (req, res, next) {
            return res.redirect('/static/index.html');
        }
    );
    
};