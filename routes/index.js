var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

router.get('/', messageController.messages_list);

router.get('/message/create', messageController.message_create_get);
router.post('/message/create', messageController.message_create_post);

router.get('/user/:id', userController.user_details);
router.get('/user/:id/membership', userController.user_membership_get);
router.post('/user/:id/membership', userController.user_membership_post);

router.get('/logout', userController.user_logout);

router.get('/sign-in', userController.user_get);
router.post('/sign-in', userController.user_post);

router.get('/sign-up', userController.user_create_get);
router.post('/sign-up', userController.user_create_post);

module.exports = router;
