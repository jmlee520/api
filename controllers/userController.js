const   JWT             = require('jsonwebtoken'), 
        bcrypt          = require('bcrypt'),
        { user }        = require('../models'),
        { JWT_SECRET }  = require('../config/secret');

//Dev
const faker = require('faker');

//JWT
var assignToken = user => {
    return JWT.sign({
        iss: 'simplopers', // issuer
        sub: user.email, // sub poiting User table id field
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day

    }, JWT_SECRET);
 
}
//response token
//res.status(200).json({token});// es6 style - same as {token:token}

module.exports = {
    signUp: (req, res) => {

        
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            

            user.create({
                
               
                email: faker.internet.email(), 
                password: hash,
                ip: faker.internet.ip(),
                phone:faker.phone.phoneNumber(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                isBusiness:faker.random.boolean(),
                allowance: faker.random.number(1),
                createdAt: faker.date.recent(),
                updatedAt: faker.date.recent()
            }).then(function (user) {

                const token = assignToken(user);
                //response token
                res.status(200).json({ token });  // es6 style - same as {token:token}   

            }).catch(function (error) {

                res.send('error');

            });

            //end of hashing   
        });

        //end of signup
    },
    signIn: (req, res) => {
       //after user is verified assign a token
       const token = assignToken(req.user); //passport will send foundUser Object as user
       res.status(200).json({ token });
    },
    signOut: (req, res)=>{
        res.send('signed out');
    },
    secret: (req, res) => {
        //req.user
        /*
        user.findAll().then(users =>{
            //res.send(JSON.stringify(users)); //res string
            res.send(users); //res JSON
        });
        */


        res.send('passed');
        //res.send(User);
        //console.log(JSON.stringify(User()));


    }

};
