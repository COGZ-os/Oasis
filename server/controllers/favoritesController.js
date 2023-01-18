const { Favorite } = require('../models/locationModels');
const { Op } = require('sequelize');

const favoritesController = {

    async getFavorites(req, res, next) {
        console.log("getFavorites")
        const { user_id } = req.query;
        console.log("user_id", user_id);
        try {
            const favoriteIds = await Favorite.findAll({ attributes: ['location_id'], where: { user_id }});
            const favoriteIdInputs = favoriteIds.map(fav => fav.dataValues.location_id);
            console.log("favoriteIds", favoriteIdInputs);
            const favoriteLocations = await Location.findAll(
                {
                     where: {
                        id: {
                            [Op.or]: favoriteIdInputs
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