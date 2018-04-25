var requireOption = require('../common').requireOption;
var User = require('../../model/User');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        
        if((req.body === undefined) || (req.body.inputEmail === undefined) || (req.body.inputPassword === undefined)) {
                res.tpl.isLoggedIn = false;
                console.log('Login false')
                return next();
            }
        var requestEmail = req.body.inputEmail;
        console.log(requestEmail);
        User.findOne({
            email: requestEmail
        }, function(err, result) {
            if((err) || (!result)) {
                res.tpl.error.push('Email is not found');
            }
            //TODO Check if password matches
            res.tpl.isLoggedIn = true;
            console.log('Succesful login')
        });

        return next();
    };

};
