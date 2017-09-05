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



module.exports = {
   
   /*
   * Register new user
   * retrun token 
   */
    signUp: (req, res) => {

/**bcrypt.hash
 * 
 * @param: password{string}, hash round{int}, callback(err,hash)
 * @return: hashedPassword{string} : <promise>
 */
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            

            user.create({
                
               
                //email: faker.internet.email(), 
                email: req.body.email, 
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
                res.status(200).json({ token,id:user.id,phone:user.phone,firstname:user.firstname,lastname:user.lastname,isBusiness:user.isBusiness,allowance:user.allowance });  // es6 style - same as {token:token}   

            }).catch(function (error) {

                res.send('error');

            });

            //end of hashing   
        });

        //end of signup
    },
    /**
     * assign a token
     */
    signIn: (req, res) => {
       //after user is verified assign a token

       const token = assignToken(req.user); //passport will send foundUser Object as user
       res.status(200)
       .json({  token,  
                id: req.user.id,
                email: req.user.email,
                phone: req.user.phone,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                isBusiness: req.user.isBusiness,
                allowance: req.user.allowance
            });//return user object also, for mobile and to display user info
    
    
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
            //req = JSON.stringify(req);
        
            res.json({id: req.user.id,
                email: req.user.email,
                phone: req.user.phone,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                isBusiness: req.user.isBusiness,
                allowance: req.user.allowance});
        
        //res.send(User);
        //console.log(JSON.stringify(User()));


    },
    test: (req, res)=>{
        res.send('please sign in');
    }
};
