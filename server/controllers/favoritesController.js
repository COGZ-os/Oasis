const favoritesController = {

    getFavorites(req, res, next) {
        res.locals.favorites = [];
        return next();
    },
    
    addFavorite(req, res, next) {
        res.locals.status = 'success';
        return next();
    },

    removeFavorite(req, res, next) {
        res.locals.status = 'success';
        return next();
    },

}

module.exports = favoritesController