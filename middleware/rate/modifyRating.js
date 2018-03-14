var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //if res.tpl.ratings is not filled with one item error
        //Modifies the rating in the database
        return next();
    };

};