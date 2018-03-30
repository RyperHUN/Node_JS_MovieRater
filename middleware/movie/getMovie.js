var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //Gets all movie data
        //If movieId is specified only returns one
        //If movieName is specified returns all matching
        //If none is specified returns all.
        //loads result in res.tpl.movies
        res.tpl.movies = [
            {
                id : 1,
                name : 'Lorem ipsum lodaded'
            },
            {
                id : 2,
                name : 'Another movie Matrix 3'
            }
        ];
        return next();
    };

};
