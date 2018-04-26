var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //Checks user authentication, if logged in succes else redirect to mainPage
        if (typeof req.session.user !== 'undefined') {
            return res.redirect('/');
        }
        return next();
    };

};
