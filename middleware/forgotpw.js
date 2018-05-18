var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //Resets password to specified password
        //Else redirect to login page and res.tpl.error fill error
        return next();
    };

};
