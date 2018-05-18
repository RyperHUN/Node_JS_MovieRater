var requireOption = require('./common').requireOption;

var mergeElements = function(result, userId) {
    result = result.filter(function(elem){
        return elem.user._id == userId && elem.movie && elem.user;
    });
    result = result.map(function(elem){
        var movieName = elem.movie.name;
        var rating = elem.rating;
        return {name:movieName, rating:rating, movieId : elem.movie._id};
    })
    return result;
}

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var Rating = requireOption(objectrepository,'RatingModel');
        
        var userId = req.session.user._id;
        Rating.find({}).populate('user').populate('movie')
        .exec(function (err, result){
            if(err) {
                console.log(err);
            }else {
                res.tpl.concat = mergeElements(result, userId);
                //console.log(res.tpl.concat);
                
                return next();
            }
        });
    };

};