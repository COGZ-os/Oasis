const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

//load a user's favorites
router.get('/', favoritesController.getFavorites, (req, res) => {
    res.status(200).json(res.locals.favorites);
});

//add a favorite
router.post('/', favoritesController.addFavorite, (req, res) => {
    res.status(200).json(res.locals.newFavorite);
});

//remove a favorite
router.delete('/', favoritesController.removeFavorite, (req, res) => {
    res.status(200).json(res.locals.removedFavorite);
});


module.exports = router;