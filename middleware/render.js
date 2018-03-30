var requireOption = require('./common').requireOption;

module.exports = function (objectrepository, viewName) {

    return function (req, res, next) {
        console.log('Rendering:' + viewName);
        res.render(viewName,res.tpl);
    };

};