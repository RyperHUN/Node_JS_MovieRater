var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof res.tpl.concat === 'undefined') {
            res.tpl.error.add('Error no movies found');
            return next(); // Error no movies
        }
        if(typeof req.query.movieName === 'undefined') {
            res.tpl.error.add('No get parameter');
            return next();
        }
        res.tpl.concat = res.tpl.concat.filter(function(elem){
            var movieName = elem.name.toUpperCase();
            return movieName.includes(req.query.movieName.toUpperCase());
        });
        return next();
    };

};
