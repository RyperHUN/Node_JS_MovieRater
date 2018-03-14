var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //Checks if res.tpl.movies is empty
        //If yes adds new movie
        //If not returns error
        return next();
    };

};
