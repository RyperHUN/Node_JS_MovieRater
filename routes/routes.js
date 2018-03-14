//Middleware includes
//var deleteItemMW = require ('../middleware/items/deleteItem');
var itemModel = {};

//Ez az amit kiajanlok masok szamara
module.exports = function (app) {
    var objectRepository = {
        itemModel: itemModel
    };

    app.use('/items/new',
        authMW(objectRepository),
        updateItemMW(objectRepository),
        renderMW(objectRepository, 'item_edit')
    );
};