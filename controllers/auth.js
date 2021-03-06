const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
         const error = new Error('Validation failed.');
         error.statusCode = 422;
         error.data = errors.array();
         throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    try {
    const hashedPw = await bcrypt.hash(password, 12);
         const user = new User({
            email: email,
            password: hashedPw,
            name: name
        });
        const result = await user.save();
        res.status(201).json({ message: 'User Created!', userId: result.id });
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;
    try {
    const user = await User.findOne({ where: {email: email} });
  
        if(!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);


        if(!isEqual) {
            const error = new Error('Wrong Password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser.id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    }
};

/* exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;
    User.findOne({ where: {email: email} })
    .then(user => {
        if(!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if(!isEqual) {
            const error = new Error('Wrong Password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser.id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err); 
    });
}; */