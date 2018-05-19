var requireOption = require('../common').requireOption;

const bcrypt = require('bcrypt');

var saveCookie = function(user, res){
    res.cookie('user', user);
}

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (req.session.isLoggedIn) {
            return next();
        }

        if ((req.body === undefined) || (req.body.mail === undefined) || (req.body.password === undefined)) {
            req.session.isLoggedIn = false;
            //console.log('Login false')
            res.tpl.error.push('No parameters provided for login');
            return next();
        }
        var requestEmail = req.body.mail;
        var requestPw = req.body.password;
        var requestRemember = req.body.remember == "on";

        var User = requireOption(objectrepository,'UserModel');
        User.findOne({
            email: requestEmail
        }, function (err, result) {
            if ((err) || (!result)) {
                res.tpl.error.push('Email is not found');
                return next();
            }
            var foundPw = result.password;
            if (bcrypt.compareSync(requestPw, foundPw)) {
                // Passwords match
                req.session.isLoggedIn = true;
                req.session.user = result;
                if(requestRemember === true) {
                    saveCookie(req.session.user, res);
                }
                return next();
            } else {
                // Passwords don't match
                res.tpl.error.push('Password is not matching');
                return next();
            }
        });
    };
};
