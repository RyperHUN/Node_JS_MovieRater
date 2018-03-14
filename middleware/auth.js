var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        //Checks user authentication, if logged in succes else redirect to mainPage
        return next();
    };

};
