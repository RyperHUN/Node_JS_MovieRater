var requireOption = require('../common').requireOption;
var mongoose = require('../../config/db');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(req.params.film_id === undefined){
            res.tpl.error.push("Film id is undefined");
            return res.redirect('/');
        }
        if(req.body.inputRating === undefined) {
            res.tpl.error.pus("Post parameter is not defined");
            return res.redirect('/');
        }
        var film_id = req.params.film_id;
        var user = res.tpl.user;
        var rating = req.body.inputRating;
        
        var Ratings = requireOption(objectrepository,'RatingModel');

        var query = {movie:film_id, user:user._id};
        var finalQuery = {movie:film_id, user:user._id, rating: rating};
        Ratings.findOne(query, function(err, result){
            if((err) || !(result)){
                //Not found
                Ratings.insertMany(finalQuery, function(err, res){
                    if((err) || !(res)){
                        console.log("Insert failed");
                        return next();
                    }
                    console.log("Insert success");
                    return next();
                });
            } else {
                Ratings.updateOne(query, {$set:{rating:rating}}, function(err, res){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Update rating succesful");
                    }
                    return next();
                });
            }
        });

    };

};