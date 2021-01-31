const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', 
[
    body('email')
    .isEmail()
    .withMessage('Please entered a valid email.')
    .custom((value, { req }) => {
        return User.findOne({ where: {email: value}}).then(user => {
            if(user) {
                return Promise.reject('E-Mail addreess already exist!');
            }
        });
    }),
    body('password').trim().isLength({min: 5}),
    body('name').trim().not().isEmpty()
],
authController.signup
);

router.post('/login', authController.login);

module.exports = router;