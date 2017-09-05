 const   router          = require('express').Router(),
         passport        = require('passport'),
         passportConfig  = require('../config/passportConfig'),
         CommentController  = require('../controllers/commentController');

const    passportJWT     = passport.authenticate('jwt',{session:false, failureRedirect: '/users/test' });

 // Routes
//read comments from a post(comments own by a post)
 router.route('/:postid').get(CommentController.readComment);

//post comment to a post(:postid)
//Todo - isLogedIn
 router.route('/:postid').post(passportJWT,CommentController.createComment);

//edit comment
//Todo - verify owner        
 router.route('/:postid/:commentid/edit').put(passportJWT,CommentController.updateComment);

//delete comment
//Todo - verify owner   
 router.route('/:postid/:commentid/delete').delete(passportJWT,CommentController.deleteComment);



 module.exports = router;

// Requirement
// create comment, read comment, edit comment, delete comment