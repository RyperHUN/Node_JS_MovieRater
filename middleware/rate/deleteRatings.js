var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if(req.params.film_id === undefined){
            res.tpl.error.push("Film id is undefined");
            return res.redirect('/');
        }
        var film_id = req.params.film_id;
        var user = res.tpl.user;
    
        var Ratings = require('../../model/Rating');
        var query = {movie:film_id, user:user._id};
        Ratings.remove(query,function(err, res){
            if(err) {
                console.log(err);
            }
            console.log("Delete rating succesful");
        });


        return next();
    };

};
