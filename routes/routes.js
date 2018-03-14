//Middleware includes
var loginMW = require ('../middleware/login.js');
var movieModel = {}; //Stores movie data like name, id etc [movieId, name]
var ratingModel = {}; //Stores a rating data [userid, moveiId,rating]
var userModel = {}; //Stores user id etc [userId, name]

//Ez az amit kiajanlok masok szamara
module.exports = function (app) {
    var objectRepository = {
        movieModel: movieModel,
        ratingModel: ratingModel,
        userModel: userModel
    };

    //Delete ratings for film id
    app.use('/rates/del/:film_id',
        loginMW(objectRepository)
    );
    //Search ratings by movie id
    app.use('/rates/mod/:film_id',
        loginMW(objectRepository)
    );
    ///FOR These you need to be logged in
    //Delete rating for film id
    app.use('/rate/del/:film_id',
        loginMW(objectRepository)
    );
    //Search rating by movie id
    app.use('/rate/mod/:film_id',
        loginMW(objectRepository)
    );

    //Search movie by id
    app.use('/movies/search/:id',
        loginMW(objectRepository)
    );
    //Search movie by name
    app.use('/movies/search/:name',
        loginMW(objectRepository)
    );
    //Adds a movie 
    app.use('/movies/add',
        loginMW(objectRepository)
    );
    //Lists all movies
    app.use('/movies',
        loginMW(objectRepository)
    );
    
    app.use('/logout',
        loginMW(objectRepository)
    );
    //A new password can be generated to the username
    app.use('/forgotpw',
        loginMW(objectRepository)
    );
    //List specific user data 
    app.use('/user/:id',
        loginMW(objectRepository)
    );
    //List users
    app.use('/users',
        loginMW(objectRepository)
    );
    app.use('/',
        loginMW(objectRepository)
    );
    
};