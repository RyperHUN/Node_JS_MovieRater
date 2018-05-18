var requireOption = require('./common').requireOption;

var mapForObj = function(obj, func){
    var newObj = {};
    Object.keys(obj).map(function(key,index){
        newObj[key] = func(obj[key]);
    });
    return newObj;
}

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
        console.log(elem);
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
        var Rating = requireOption(objectrepository,'RatingModel');
        Rating.find({}).populate('user').populate('movie')
        .exec(function (err, result){
            if(err) {
                console.log(err);
            }else {
                res.tpl.concat = mergeElements(result);
                //console.log(res.tpl.concat);
                
                return next();
            }
        });
    };

};