var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //Get ratings for [movieId], if movieId not found return error
        //If userId is specified, only returns one
        //loads ratings in res.tpl.ratings
        res.tpl.ratings = [
            {
                movieId : 1,
                userId : 10,
                rating : 5,
            },
            {
                movieId : 2,
                userId : 11,
                rating : 10
            }
        ];
        return next();
    };

};
