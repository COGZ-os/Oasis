const authController = {

    signUp(req, res, next) {
        req.locals.newUser = {'user': 0};
    },

    logIn(req, res, next) {
        req.locals.newUser = 'success';
    }

}

module.exports = authController