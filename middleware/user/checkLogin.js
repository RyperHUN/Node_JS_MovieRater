var requireOption = require('../common').requireOption;
var User = require('../../model/User');
const bcrypt = require('bcrypt');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (req.session.isLoggedIn) {
            return next();
        }

        if ((req.body === undefined) || (req.body.mail === undefined) || (req.body.password === undefined)) {
            req.session.isLoggedIn = false;
            console.log('Login false')
            return next();
        }
        var requestEmail = req.body.mail;
        var requestPw = req.body.password;

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
                return next();
            } else {
                // Passwords don't match
                res.tpl.error.push('Password is not matching');
                return next();
            }

            return next();
        });
    };
};
