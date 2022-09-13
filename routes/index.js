var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', userController.user_create_get);
router.post('/sign-up', userController.user_create_post);

module.exports = router;
