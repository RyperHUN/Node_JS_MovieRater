var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //deletes ratings in res.tpl.ratings 
        return next();
    };

};
