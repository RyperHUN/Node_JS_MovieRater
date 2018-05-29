/**
 * Load a dependency from an object repository
 * @param objectRepository object repository
 * @param propertyName dependency name
 * @returns {*}
 */
function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    throw new TypeError(propertyName + ' required');
}

module.exports.requireOption = requireOption;

///TODO Some kind of model for movie
function omdbToMyDB(movie){
    return {
        name: movie.title,
        rating : 0,
        movieId : 0
    };
}

module.exports.omdbToMyDB = omdbToMyDB;

