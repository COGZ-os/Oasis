const db = require('../models/locationModels');

const authController = {

    signUp(req, res, next) {
        res.locals.newUser = {'user': 0};
        next();
    },

    logIn(req, res, next) {
        res.locals.status = 'success';
        next();
    }

}

module.exports = authController