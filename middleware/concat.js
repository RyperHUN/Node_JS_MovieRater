var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.tpl.concat = [
            {
                name : "Lorem ipsum",
                rating : 8.5
            },
            {
                name : "Matrix IV",
                rating : 9.9
            },
        ]   
        return next();
    };

};