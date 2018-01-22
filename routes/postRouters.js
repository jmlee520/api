const   router          = require('express').Router(),
        passport        = require('passport'),
        passportConfig  = require('../config/passportConfig'),
        PostController  = require('../controllers/postController'),
        {isOwnerOfPost} = require('../middleware');

const   passportJWT     = passport.authenticate('jwt',{session:false,failureRedirect: '/users/signin'});


//create a new post
router.route('/new').post(PostController.createPost);

//upload photo after a post is created, in client this can be a page after post submit
//router.route('/new/upload/:postid').post(isOwnerOfPost,PostController.upload);
// TODO- photo table - id, userid, postid, photo(10 columns for future? but limiting 5 from client), createdAt, updatedAt

//Method - using AWS s3, first client request to this route then server request to S3 for token then get response from s3 and response token
//to client.
//then client use that token to upload picture directly to S3. 
//in client image needs to be resized and named according to their postId then send it to server to save image url to database
//TODO - resizing, reducing quality, and renaming of original image
//TODO - thumbnail generation from client? then upload directly to s3? Or use aws lambda to create thumbnail(this may cause extra cost) 


router.route('/new/upload/:postid').post(PostController.upload);


//detail page of a post
router.route('/search/detail/:postid').get(PostController.readDetailPost);

//search posts, region and page params are required
router.route('/search/:region/:page').get(PostController.readPost);

//update 
router.route('/:postid').put(isOwnerOfPost,PostController.updatePost);//TODO - photo update, might require another route

//delete
router.route('/:postid').delete(isOwnerOfPost,PostController.deletePost);//TODO - handle photo deletion also


//testing purpose
router.route('/all').get(PostController.all);

module.exports = router;


// requirements
// list of rooms - pagination
// sorting, searching
// detail page


//image

//https://www.npmjs.com/package/jimp

//crop from client