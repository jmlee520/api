const JWT = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { comment } = require('../models'),
    { JWT_SECRET } = require('../config/secret');

//Dev
const faker = require('faker');
/*
userId: DataTypes.INTEGER,
postId: DataTypes.INTEGER,
comment: DataTypes.TEXT,
report: DataTypes.INTEGER,
likes: DataTypes.INTEGER
*/

module.exports = {
    createComment: (req, res) => {

        comment.create({

            userId: req.user.id,
            postId: req.params.postid,
            comment: faker.lorem.text(),
            report: faker.random.number(),
            likes: faker.random.number(),
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent()
        }).then(function (newComment) {

            res.json(newComment);
            //res.redirect('/comments/'+newComment.postId); // TODO - how to redirect client from here to refresh to view new comments

        }).catch(function (error) {

            res.send('database error');

        });


    },
    readComment: (req, res) => {
      
            comment.findAll({ where: { postId: req.params.postid } }).then(posts => { res.json(posts) });

    },
    updateComment: (req, res) => {
        comment.update({
            userId: req.user.id,
            postId: req.params.postid,
            comment: faker.lorem.text,
            report: faker.random.number(),
            likes: faker.random.number(),
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent()
        }).then(function(editedComment){

        }).catch(function(error){

        });
    },
    deleteComment: (req, res) => {
        comment.destroy({where:{userId:req.params.id},cascade:true});
    }

};
