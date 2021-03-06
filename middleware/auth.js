var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //Checks user authentication, if logged in succes else redirect to mainPage
        if (typeof req.cookies === 'undefined' || typeof req.cookies.user === 'undefined') {
            if (typeof req.session.user === 'undefined') {
                return res.redirect('/');
            } 
        } else {
            req.session.user = req.cookies.user;
            req.session.isLoggedIn = true;
        }
        
        res.tpl.user = req.session.user;
        res.tpl.isLoggedIn = req.session.isLoggedIn;
        return next();
    };

};
