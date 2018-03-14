var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //Get ratings for [movieId], if movieId not found return error
        //If userId is specified, only returns one
        //loads ratings in res.tpl.ratings
        return next();
    };

};
