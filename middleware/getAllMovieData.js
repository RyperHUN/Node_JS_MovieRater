var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var Rating = require('../model/Rating');
        var User = require('../model/Movie');
        var Movie = require('../model/User');
        Rating.find({}).populate('user').populate('movie')
        .exec(function (err, result){
            if(err) {
                console.log(err);
            }else {
                data = [];
                
                console.log('Length:' + result.length);
                result.forEach(function(elem) {
                    if(elem.movie == null || elem.user == null)
                        return;
                    data.push({name : elem.movie.name, rating : elem.rating});
                });
                res.tpl.concat = data;
                
                return next();
            }
        });
    };

};