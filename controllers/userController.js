const { body, validationResult, check} = require("express-validator");

const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.user_get = (req, res, next) => {
    res.render('sign-in-form');
};

exports.user_post = (req, res, next) => {
    console.log(req.url);
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/sign-in"
    })(req, res, next);
};

exports.user_create_get = (req, res, next) => {
    res.render('sign-up-form');
};

exports.user_create_post = [
    body("firstName", "First name must not be empty.")
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape(),
    body("secondName", "Second name must not be empty.")
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape(),
    body('email')
        .isEmail(),
    body('password', 'Six chars min')
        .isLength({min: 6}),
    check('confirmPassword', 'Confirm password field must have the same value as the password field')
        .exists()
        .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);

            const errors = validationResult(req);

            const user = new User({
                firstName: req.body.firstName,
                secondName: req.body.secondName,
                email: req.body.email,
                password: req.body.password
            });

            if (!errors.isEmpty()) {
                res.render('sign-up-form', {
                    user,
                    errors: errors.array(),
                });

                return;
            } else {
                user.password = hashedPassword;

                user.save(err => {
                    if (err) return next(err);

                    res.redirect('/');
                })
            }
        });
    }
];