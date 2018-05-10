var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    //Logs out user if logged in
    return function (req, res, next) {
        req.session.user = undefined;
        req.session.isLoggedIn = false;
        
        return next();
    };

};
