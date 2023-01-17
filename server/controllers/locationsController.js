const locationsController = {

    getLocations(req, res, next) {
        res.locals.locations = [];
        return next();
    },
    
    createLocation(req, res, next) {
        res.locals.newLocation = {'location': 0};
        return next();
    },

    voteOnLocation(req, res, next) {
        res.locals.updatedLocation = {'location': 1};
        return next();
    },

}

module.exports = locationsController