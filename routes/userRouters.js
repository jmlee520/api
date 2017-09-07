const   router          = require('express').Router();
const   passport        = require('passport'),
        passportConfig  = require('../config/passportConfig'),
        UserController  = require('../controllers/userController'),
        {isUserExist}   = require('../middleware');
        
        
const   passportSignIn  = passport.authenticate('local',{session:false}),
        passportJWT     = passport.authenticate('jwt',{session:false});

// ROUTES
router.route('/signup').post(isUserExist,UserController.signUp); //TODO- check IP

router.route('/signin').post(passportSignIn,UserController.signIn);
    
router.route('/signout').post(UserController.signOut);//can be done from client by deleteting token

router.route('/resetpassword').get(UserController.resetPassword);

router.route('/unregister').get(UserController.unregister);

router.route('/profile').get(passportJWT,UserController.profile);

//testing purpose
router.route('/all').get(UserController.all);

module.exports = router;

//TODO - email verification, password reset