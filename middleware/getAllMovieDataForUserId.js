var mergeElements = function(result, userId) {
    var dataArray = [];
    result.forEach(function(elem) {
        if(elem.movie == null || elem.user == null)
            return;
        var movieName = elem.movie.name;
        var rating = elem.rating;
        if(elem.user._id == userId) {
            dataArray.push({name:movieName, rating:rating, movieId : elem.movie._id});
        }
    });
    return dataArray;
}

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var Rating = require('../model/Rating');
        
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