var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/sign-in', userController.user_get);
router.post('/sign-in', userController.user_post);

router.get('/sign-up', userController.user_create_get);
router.post('/sign-up', userController.user_create_post);

module.exports = router;
