const   router          = require('express').Router(),
        passport        = require('passport'),
        passportConfig  = require('../config/passportConfig'),
        PostController  = require('../controllers/postController');

        const   passportSignIn  = passport.authenticate('local',{session:false}),
        passportJWT     = passport.authenticate('jwt',{session:false});
// // Routes

// // search/read post /search/:page or /search?search=cityName&page=1
 router.route('/search').get(PostController.search);
 

// //post room
 //router.route('/new').post(passportJWT,PostController.createPost);
router.route('/new').post(PostController.createPost);//test purpose
        
router.route('/:id').put(PostController.editPost);

router.route('/:id').delete(PostController.deletePost);





 module.exports = router;


// requirements
// list of rooms - pagination
// sorting, searching
// detail page

// create a post(room), read post list, read post detail, edit post, delete post, search and filter post