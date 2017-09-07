const JWT = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { comment } = require('../models'),
    { JWT_SECRET } = require('../config/secret');

//Dev
const faker = require('faker');


module.exports = {
    createComment: (req, res) => {
        comment.create({
            userId: req.body.userId,
            postId: req.body.postId,
            comment: req.body.comment,
            report: req.body.report,
            likes: req.body.likes,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }).then(function (user) {
            //assign a token
            const token = assignToken(user);
            //response token
            res.status(200).json({ token });  // es6 style - same as {token:token}
        }).catch(function (error) {
            res.status(500).send('Internal Server Error');

        });


    },
    readComment: (req, res) => {

    },
    updateComment: (req, res) => {

    },
    deleteComment: (req, res) => {

    },
    //testing purpose
    all:(req,res)=>{
        comment.findAll().then((comments)=>{
            res.json(comments);
        })
    }

};
