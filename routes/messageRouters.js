const   router          = require('express').Router(),
passport        = require('passport'),
passportConfig  = require('../config/passportConfig'),
MessageController  = require('../controllers/messageController');

const   passportJWT     = passport.authenticate('jwt',{session:false,failureRedirect: '/users/signin'});

//testing purpose
router.route('/all').get(MessageController.all);

module.exports = router;

//TODO -- messaging - web notification, mobile app notification