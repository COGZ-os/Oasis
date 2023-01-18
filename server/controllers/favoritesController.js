const { Favorite } = require('../models/locationModels');

const favoritesController = {

    getFavorites(req, res, next) {
        
        res.locals.favorites = [];
        return next();
    },
    
    async addFavorite(req, res, next) {
        const { user_id, location_id } = req.body;
        try {
            const newFavoriteFromDB = await Favorite.create({ user_id, location_id });
            res.locals.newFavorite = newFavoriteFromDB;
            return next();
        } catch (err) {
            return next(err);
        }
    },
    async removeFavorite(req, res, next) {
        const { user_id, location_id } = req.body;
        try {
            const newFavoriteFromDB = await Favorite.destroy({ where: { user_id, location_id }});
            res.locals.removedFavorite = newFavoriteFromDB;
            return next();
        } catch (err) {
            return next(err);
        }
    },
}

module.exports = favoritesController