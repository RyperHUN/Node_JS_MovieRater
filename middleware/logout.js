var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    //Logs out user if logged in
    return function (req, res, next) {
        req.session.user = undefined;
        req.session.isLoggedIn = false;
        res.clearCookie('user');
        
        return next();
    };

};
