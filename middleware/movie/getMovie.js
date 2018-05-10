var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //movies/search/:film_id
        if(req.params.film_id === undefined){
            res.tpl.error.push("Film id is undefined");
            return res.redirect('/');
        }
        if(res.tpl.concat == undefined) {
            res.tpl.error.push("Movie data not exists");
            return res.redirect('/');
        }
        var film_id = req.params.film_id;
        var found_movie = res.tpl.concat.find(function(elem){
            return elem.movieId == film_id;
        });
        if(found_movie == undefined) {
            res.tpl.error.push("Film id does not exists in the database");
            return res.redirect('/');
        }

        res.tpl.found_movie = found_movie;
        
        return next();
    };

};
