var requireOption = require('./common').requireOption;
var omdbToMyDB = require('./common').omdbToMyDB;
var omdb = require('../third_party/omdb');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var movieName = req.query.movieName; ///TODO Check if exists
        omdb.search(movieName, function(err, movies){
            if(err) {
                res.tpl.error.push("Error happened when getting data");
                return next("Error happened when getting data");
            }
            
            if(movies.length < 1){
                console.log("No movies found");
                return next();
            }
            
            var newMovies = movies.map(elem => omdbToMyDB(elem));
            
            var concated = res.tpl.concat.concat(newMovies);
            var concatedNames = concated.map(e => e.name);
            var unique = concated.filter(function(value,index,self){
                return concatedNames.indexOf(value.name) == index;
            });
            res.tpl.concat = unique;
                
            return next();
        });
        return next;
    };

};