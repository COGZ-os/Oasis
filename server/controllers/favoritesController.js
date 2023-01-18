const { Favorite, Location } = require('../models/locationModels');
const locationsController = require('./locationsController');

const favoritesController = {

    async getFavorites(req, res, next) {
        const { user_id } = req.params;
        try {
            const favoriteIds = await Favorite.findAll({ attributes: ['location_id'], where: { user_id }});
            const favoriteLocations = await Location.findAll(
                {
                     where: {
                        id: {
                            [Sequelize.Op.in]: favoriteIds
                        }
                    }
                }
            );
            res.locals.favorites = favoriteLocations;
            return next();
        } catch (err) {
            return next(err);
        }  
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