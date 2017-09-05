const   router          = require('express').Router(),
        passport        = require('passport'),
        passportConfig  = require('../config/passportConfig'),
        PostController  = require('../controllers/postController');

const   passportJWT     = passport.authenticate('jwt',{session:false, failureRedirect: '/users/test' });//TODO - handle redirect


// Routes

// search/read post /search/:page or /search?search=cityName&page=1
 router.route('/search').get(PostController.search);
 
//post a new room
router.route('/new').post(passportJWT,PostController.createPost);

//edit a room
router.route('/:id').put(passportJWT,PostController.editPost);

//delete a room
router.route('/:id').delete(passportJWT,PostController.deletePost);





 module.exports = router;


// requirements
// list of rooms - pagination
// sorting, searching
// detail page

// create a post(room), read post list, read post detail, edit post, delete post, search and filter post