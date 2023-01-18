const { User } = require('../models/locationModels');

const authController = {
    async signUp(req, res, next) {
        const { name, email, password } = req.body;
        const newUser = { name, email, password };
        try {
            const newUserResult = await User.create(newUser);
            res.locals.newUser = {newUser: newUserResult};
            return next();
        } catch (err) {
            return next(err);
        }
    },
    async logIn(req, res, next) {
        const { email, password } = req.body;
        try {
            const foundUser = await User.findOne({ where: { email, password }});
            if (foundUser) {
                res.locals.status = { status: 'success'};
            } else {
                res.locals.status = { status: 'failure'};
            }
            return next();
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = authController