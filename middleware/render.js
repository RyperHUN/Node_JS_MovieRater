var requireOption = require('./common').requireOption;

module.exports = function (objectrepository, viewName) {

    return function (req, res, next) {
        res.tpl.viewName = "/";
        if(viewName != "index") {
            res.tpl.viewName = res.tpl.viewName + viewName;
        }
        console.log(res.tpl.viewName)
        console.log('Rendering:' + viewName);
        res.render(viewName,res.tpl);
    };

};