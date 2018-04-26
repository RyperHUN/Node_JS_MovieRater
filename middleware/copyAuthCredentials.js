var requireOption = require('./common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.tpl.user = req.session.user;
        return next();
    };

};
