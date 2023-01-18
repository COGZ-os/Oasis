const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signUp, (req, res) => {
    res.status(200).json(res.locals.newUser);
});

router.post('/login', authController.logIn, (req, res) => {
    res.status(200).json(res.locals.status);
});

module.exports = router;