const JWT = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { comment } = require('../models'),
    { JWT_SECRET } = require('../config/secret');

//Dev
const faker = require('faker');

userId: DataTypes.INTEGER,
postId: DataTypes.INTEGER,
comment: DataTypes.TEXT,
report: DataTypes.INTEGER,
likes: DataTypes.INTEGER


module.exports = {
    createComment: (req, res) => {


        comment.create({
            //username: faker.internet.userName(),
            username: req.body.username,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: hash,
            ip: faker.internet.ip(),
            allowance: faker.random.number(),
            upload: faker.random.number(),
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent()
        }).then(function (user) {

            const token = assignToken(user);
            //response token
            res.status(200).json({ token });  // es6 style - same as {token:token}

        }).catch(function (error) {

            res.send('error');

        });


    },
    readComment: (req, res) => {

    },
    editComment: (req, res) => {

    },
    deleteComment: (req, res) => {

    }

};
