//Middleware includes
var loginMW = require ('../middleware/login.js');
var logoutMW = require ('../middleware/logout.js');
var forgotpwMW = require ('../middleware/forgotpw.js');
var authMW = require ('../middleware/auth.js');
var registerUserMW = require('../middleware/user/register.js')
var inverseAuthMV = require ('../middleware/inverseAuth.js')
var deleteRatingsMW = require ('../middleware/rate/deleteRatings.js');
var getRatingsMW = require ('../middleware/rate/getRatings.js');
var modifyRatingMW = require ('../middleware/rate/modifyRating.js');

var getMovieById = require('../middleware/movie/getMovieById.js');
var getMovieByIdFromConcatMW = require('../middleware/movie/getMovieFromConcatId.js');
var addMovieMW = require('../middleware/movie/addMovie.js');
var filterMoviesMW = require('../middleware/movie/filterMovie.js');

var getAllDataMW = require('../middleware/getAllMovieData.js');
var getAllDataForUserId = require('../middleware/getAllMovieDataForUserId.js')
var copyAuthCredentials = require('../middleware/copyAuthCredentials.js')

var checkLoginMW = require('../middleware/user/checkLogin.js')
var getUsers = require('../middleware/user/getUsers.js');
var renderMW = require('../middleware/render.js');

var User = require('../model/User');//Stores user id etc [userId, name, username,pw, isAdmin]
var Rating = require('../model/Rating');//Stores a rating data [userid, moveiId,rating]
var Movie = require('../model/Movie'); //Stores movie data like name, id etc [movieId, name]

//Ez az amit kiajanlok masok szamara
module.exports = function (app) {
    var objectRepository = {
        MovieModel: Movie,
        RatingModel: Rating,
        UserModel: User
    };

    //Used when deleting rating
    //Delete ratings for film id
    app.use('/rate/del/:film_id',
        authMW(objectRepository),
        deleteRatingsMW(objectRepository),
        inverseAuthMV(objectRepository) ///TODO Redirect to movie page
    );
    //Get ratings by movie id
    //TODO IS USED???
    app.use('/rate/:film_id',
        authMW(objectRepository),
        getRatingsMW(objectRepository)
    );
    //For every rating modify you need auth
    app.use('/rate/mod/:film_id',        
        authMW(objectRepository)
    );
    //For get we only render the page
    app.get('/rate/mod/:film_id',
        ///TODO If no rating yet it is not working
        getAllDataForUserId(objectRepository), //Includes user data for movies
        getMovieById(objectRepository), //Includes film ID in found_movie
        getMovieByIdFromConcatMW(objectRepository), // fills res.tpl.found_movie rating if there is rating
        renderMW(objectRepository, "modifyRating")
    );
    //For post we render the page and then return back.
    app.post('/rate/mod/:film_id',
        modifyRatingMW(objectRepository),
        inverseAuthMV(objectRepository) ///TODO Redirect to movie page
        //If modify is succesful return to home page
    );
    //TODO Is this used?
    //Search movie by id
    app.use('/movies/search/:film_id',
        getMovieByIdFromConcatMW(objectRepository)
    );
    //TODO Is this works?
    //Search movie by name
    app.use('/movies/search/:name',
        getMovieByIdFromConcatMW(objectRepository),
        renderMW(objectRepository, "search")
    );
    ///TODO A popup for this????
    ///TODO Only in admin mode?
    //Adds a movie 
    app.use('/movies/add',
        authMW(objectRepository),
        getMovieByIdFromConcatMW(objectRepository), //Check if movie exists
        addMovieMW(objectRepository)
    );
    ///TODO Is this used????

    //Lists all movies
    app.use('/movies',
        getMovieByIdFromConcatMW(objectRepository),
        renderMW(objectRepository, "movies")
    );

    //Lists all movies
    app.use('/search',
        copyAuthCredentials(objectRepository),
        //check if get param exists for search [movieName=""];
        getAllDataMW(objectRepository),
        filterMoviesMW(objectRepository),
        renderMW(objectRepository, "search")
    );
    app.use('/register',
        inverseAuthMV(objectRepository),
        registerUserMW(objectRepository),
        //If post request has register data redirect main page
        renderMW(objectRepository, "register")
    )
    app.use('/login',
        checkLoginMW(objectRepository),
        //IfAuthentication Successfull, redirect to main page
        inverseAuthMV(objectRepository),
        renderMW(objectRepository, "login")
    );
    //TODO After logoit the login not works properly
    app.use('/logout',
        logoutMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/');
        }
    );

    
    app.get('/counter', function(req, res) {
        ctr = req.cookies.counter;
        if(ctr === undefined) {
            res.cookie('counter', 1);
        } else {
            res.cookie('counter', ++ctr);
        }
        console.log(ctr);

        if (!req.cookies.counter) {
            res.send('This is your first visit!');
        } else {
            res.send('This is visit number '+ ctr +'!');
        }
    });

    //TODO FORGET PW
    //A new password can be generated to the username
    app.use('/forgotpw',
        forgotpwMW(objectRepository)
    );
    //List specific user data 
    //TODO ???? IS USED??????
    app.use('/user/:id',
        authMW(objectRepository), 
        getUsers(objectRepository),
        getRatingsMW(objectRepository), //TODO Only get ratings for userId
        getMovieByIdFromConcatMW(objectRepository),  //TODO Only get movies for ratings
        renderMW(objectRepository, 'profile')
    );
    //Used
    //TODO Store user data in res.tpl.user
    app.use('/profile',
        authMW(objectRepository), 
        getAllDataForUserId(objectRepository),
        function (req, res, next) {
            res.tpl.userData = req.session.user;
            return next();
        },
        renderMW(objectRepository, 'profile')
    );
    //????Used??
    //List users
    app.use('/users',
        authMW(objectRepository),
        getUsers(objectRepository)
    );
    //Used home page
    app.get('/',
        function (req, res, next) {
            console.log('Loading index.html');
            return next();
        },
        copyAuthCredentials(objectRepository),
        getAllDataMW(objectRepository), //TODO Add normal data for movies concat all data.
        renderMW(objectRepository, 'index')
    );
    
};