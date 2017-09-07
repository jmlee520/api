 const   router          = require('express').Router(),
         passport        = require('passport'),
         passportConfig  = require('../config/passportConfig'),
         CommentController  = require('../controllers/commentController');

const   passportJWT     = passport.authenticate('jwt',{session:false,failureRedirect: '/users/signin'});

// Routes

//create a comment
router.route('/:postid').post(passportJWT,CommentController.createComment);

//read comments, post page
router.route('/post/:postid').get(CommentController.readComment);

//read comments, business page
//router.route('/business/:businessid').get(CommentController.readComment); //TODO

//edit, post
router.route('/:postid/:commentid/edit').put(passportJWT,CommentController.updateComment);

//delete, post
router.route('/:postid/:commentid/delete').delete(passportJWT,CommentController.deleteComment);

//testing purpose
router.route('/all').get(CommentController.all);


 module.exports = router;

