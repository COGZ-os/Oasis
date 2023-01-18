const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locationsController');

//view locations that meet search parameters
router.get('/', locationsController.getLocations, (req, res) => {
    res.status(200).json(res.locals.locations);
});

//add data about a new location
router.post('/', locationsController.createLocation, (req, res) => {
    res.status(200).json(res.locals.newLocation);
});

//vote on safety of an existing location
router.patch('/', locationsController.voteOnLocation, (req, res) => {
    res.status(200).json(res.locals.updatedLocation);
});


module.exports = router;