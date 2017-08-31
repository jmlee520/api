const   JWT             =  require('jsonwebtoken'), 
bcrypt          = require('bcryptjs'),
{ User }        = require('../models'),
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

module.exports = {
signUp: (req, res) => {


bcrypt.hash(req.body.password, 10, function (err, hash) {
    

    User.create({
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

    //end of hashing   
});

//end of signup
},
signIn: (req, res) => {
//console.log('signin');
},
signOut: (req, res)=>{

},
secret: (req, res) => {
/*
User.findAll().then(users =>{
    //res.send(JSON.stringify(users)); //res string
    res.send(users); //res JSON
});
*/


res.send('passed');
//res.send(User);
//console.log(JSON.stringify(User()));


}

};
