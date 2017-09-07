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
        sub: user.id, // sub poiting User table id field
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day

    }, JWT_SECRET);
 
}
//response token
//res.status(200).json({token});// es6 style - same as {token:token}

var signoutToken = user => {
    return JWT.sign({
        iss: 'simplopers', // issuer
        sub: user.id, // sub poiting User table id field
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate()) // current time

    }, JWT_SECRET);
 
}



module.exports = {
    signUp: (req, res) => {

        
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            

            user.create({
                
               
                email: req.body.email, 
                password: hash,
                ip: faker.internet.ip(),
                phone:faker.phone.phoneNumber(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                isBusiness:faker.random.boolean(),
                allowance: faker.random.number(1),
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime()
            }).then(function (user) {

                const token = assignToken(user);
                //response token
                res.status(200).json({ token,userInfo:{email: user.email,phone:user.phone,firstName:user.firstname,lastName:user.lastname,allowance:user.allowance } });  // es6 style - same as {token:token}   

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
    profile: (req, res) => {
        //TODO - edit - can reset name,email,password, view - posted rooms (my rooms), favorites


        res.send('this is your profile');
        

    },
    profileUpdate: (req, res) => {


    },
    resetPassword: (req, res) => {
        //TODO - search more on this, generate one time use url to reset password, 
        //another method is generate random password and update it to user's password then 
        //send via email then user can change password from profile eidt page
    },
    unregister: (req, res) => {
        //TODO - find all comment by userid then delete all comment, find all records 
        //from message then delete, the do same for posts, if business User delete record from business, finaly delete user
        // Do not delete user right away, give some day then delete it. for record purpose, ADD disabled column for this purpose    
    },
    all:(req,res)=>{
        user.findAll().then((users)=>{
            res.json(users);
        })
    }

};
