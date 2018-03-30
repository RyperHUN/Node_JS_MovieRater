var requireOption = require('./common').requireOption;

module.exports = function (objectrepository, viewName) {

    return function (req, res, next) {
        res.render(viewName,res.tpl);
        return next();
    };

};