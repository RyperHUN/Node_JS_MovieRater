var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        //Logs out user if logged in
        return next();
    };

};
