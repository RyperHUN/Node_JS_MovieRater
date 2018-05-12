var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    return function (req, res, next) {
        if((req.body === undefined) || (req.body.mail === undefined) || (req.body.password === undefined)) {
            return next();
        }
        var requestEmail = req.body.mail;
        var requestPw = req.body.password;

        var User = require('../../model/User');
        User.findOne({
            email: requestEmail
        }, function(err, result) {
            if((err) || (result)) {
                res.tpl.error.push('Email already exists');
                return next();                
            }
            //No email exists in DB
            var mongoose = require('../../config/db');
            var userId = mongoose.mongo.ObjectId();
            var userData = new User({_id : userId,name : 'DUMMY',
             username:'DUMMY',email:requestEmail ,password:requestPw, isadmin : false});
            userData.save(function(err){
                if(err) {
                    res.tpl.error.push("Register failed: " + err);
                    return next();
                } 
                return res.redirect('/');
            });
        });
    };
};
