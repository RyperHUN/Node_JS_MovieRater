var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //movies/search/:film_id
        if(req.params.film_id === undefined) {
            res.tpl.error.push("Film id is undefined");
            return res.redirect('/');
        }
        var film_id = req.params.film_id;

        var Movie = require('../../model/Movie');
        Movie.findOne({_id : film_id}).exec(function(err, result){
            if((err) || !(result)){
                res.tpl.error.push("Film id does not exists in the database");
                return res.redirect('/');
            }
            res.tpl.found_movie = {name : result.movieName, rating:undefined, movieId : result._id}
            return next();
        });
    };

};
