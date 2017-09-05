const   router          = require('express').Router();
const   passport        = require('passport'),
        passportConfig  = require('../config/passportConfig'),
        UserController  = require('../controllers/userController'),
        {isUserExist}   = require('../middleware');
        
        
const   passportSignIn  = passport.authenticate('local',{session:false}),
        passportJWT     = passport.authenticate('jwt',{session:false, failureRedirect: '/users/test' });

// ROUTES

//signup
router.route('/signup').post(isUserExist,UserController.signUp); 

//signin
router.route('/signin').post(passportSignIn,UserController.signIn);

//this can be done from client by deleteing token
router.route('/signout').post(UserController.signOut);

//secret page after login, test purpose
router.route('/secret').get(passportJWT,UserController.secret);

//testing
router.route('/test').get(UserController.test);

module.exports = router;

