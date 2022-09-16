const { body,validationResult } = require("express-validator");
const Message = require('../models/Message');
const User = require('../models/User');

exports.message_create_get = (req, res, next) => {res.render('message-form')};

exports.message_create_post = [
    body('title', 'Title must not be empty')
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape(),
    body('text', 'Text must not be empty')
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.title,
            timeStamp: new Date(),
            text: req.body.text,
        });


        User.findById(req.user._id).exec((err, user) => {
            if (err) return next(err);

            if (user === null) {
                const err = new Error('User not found');
                err.status = 404;
                return next(err);
            }

            if (!errors.isEmpty()) {
                res.render('message-form', { errors: errors.array() });

                return;
            } else {
                message.author = user._id;
                message.save(err => {
                    if (err) return next(err);

                    res.redirect(message.url);
                })
            }
        })
    }
]

exports.messages_list = (req, res, next) => {

};