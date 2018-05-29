var requireOption = require('./common').requireOption;
var omdb = require('omdb');

var mergeElements = function(result) {
    var data = {};
    result.forEach(function(elem) {
        if(elem.movie == null || elem.user == null)
            return;
        var movieName = elem.movie.name;
        //console.log(elem);
        if(data[movieName]) {
            var obj  = data[movieName];
            obj.rating += elem.rating;
            obj.count += 1;
        } else{
            data[movieName] = {name : movieName, rating : elem.rating, 
                                count : 1,  movieId : elem.movie._id};
        }
    });
    var finalData = mapForObj(data, function(elem){
        var averageRating =  elem.rating / elem.count;
        averageRating = Math.round(averageRating * 10) / 10;
        delete elem.count;
        elem.rating = averageRating;
        return elem;
    });
    finalData = Object.values(finalData);
    return finalData;
}

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var movieName = req.query.movieName; ///TODO Check if exists
        omdb.search({title:movieName}, function(err, movies){
            if(err) {
                res.tpl.error.push("Error happened when getting data");
                return next("Error happened when getting data");
            }

            if(movies.length < 1){
                console.log("No movies found")
            }
            
            
            res.tpl.concat = mergeElements(result);
                //console.log(res.tpl.concat);
                
            return next();
            
        });
        
        
            
        });
    };

};