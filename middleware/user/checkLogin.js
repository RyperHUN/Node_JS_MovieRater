var requireOption = require('../common').requireOption;
var User = require('../../model/User');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(req.session.isLoggedIn) {
            return next();
        }

        if((req.body === undefined) || (req.body.mail === undefined) || (req.body.password === undefined)) {
                req.session.isLoggedIn = false;
                console.log('Login false')
                return next();
            }
        var requestEmail = req.body.mail;
        User.findOne({
            email: requestEmail
        }, function(err, result) {
            if((err) || (!result)) {
                res.tpl.error.push('Email is not found');
            }
            //TODO Check if password matches
            req.session.isLoggedIn = true;
            req.session.user = result;
            return next();
        });
    };
};
