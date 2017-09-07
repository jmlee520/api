const JWT = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { user,post,comment,message } = require('../models'),
    { JWT_SECRET } = require('../config/secret');

//Dev
const faker = require('faker');

//JWT
var assignToken = user => {
    return JWT.sign({
        iss: 'simplopers', // issuer
        sub: user.id, // sub poiting User table id field
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day

    }, JWT_SECRET);

}
//response token
//res.status(200).json({token});// es6 style - same as {token:token}

module.exports = {
    dashboard: (req, res) => {

    },
    signIn: (req, res) => {
        //console.log('signin');
    },
    users: (req, res) => {
        user.findAndCountAll()
        .then((users)=>{
            res.status(200).json(users.count);
        }).catch((error)=>{
            res.status(500).send('Internal Server Error'+error);
        });
    },
    posts: (req, res) => {
        post.findAndCountAll()
        .then((posts)=>{
            res.status(200).json(posts.count);
        }).catch((error)=>{
            res.status(500).send('Internal Server Error'+error);
        });
    },
    messages: (req, res) => {
        message.findAndCountAll({
            attributes: ['id']
        })
        .then((messages)=>{
            res.status(200).json(messages.count);
        }).catch((error)=>{
            res.status(500).send('Internal Server Error'+error);
        });
    },
    comments: (req, res) => {
        comment.findAndCountAll()
        .then((comments)=>{
            res.status(200).json(comments.count);
        }).catch((error)=>{
            res.status(500).send('Internal Server Error'+error);
        });
    }

};
