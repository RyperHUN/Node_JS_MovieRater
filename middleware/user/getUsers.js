var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        //If userId is specified returns specific user data
        //Else returns all user data
        //fills in [res.tpl.users]
        return next();
    };

};
