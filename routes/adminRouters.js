const   router          = require('express').Router(),
        passport        = require('passport'),
        passportConfig  = require('../config/passportConfig'),
        AdminController = require('../controllers/adminController');


// Routes
router.route('/dashboard').get(AdminController.dashboard);

router.route('/users').get(AdminController.users);

router.route('/posts').get(AdminController.posts);

router.route('/comments').get(AdminController.comments);

router.route('/messages').get(AdminController.messages);

module.exports = router;


