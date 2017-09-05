const   passport        = require('passport'),
        jwtStrategy     = require('passport-jwt').Strategy,
        {ExtractJwt}    = require('passport-jwt'),
        LocalStrategy   = require('passport-local').Strategy,
        {JWT_SECRET}    = require('./secret'),
        {user}          = require('../models'),
        {isValidPassword}   = require('../middleware');

// JSON WEB TOKEN STRATEGY
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authtoken'), //example: {authtoken:asdfljkw;kljaaf;kawklfasdfksadf}
    secretOrKey:JWT_SECRET

}, (payload, done)=>{
    try{
        
        if(payload.exp < new Date().getTime()){
           return done(null,{message:"token expired"});
        }

        user.findOne({where:{id:payload.sub}})
        .then(function(foundUser){
            return done(null, foundUser);
        }).catch(function (error) {
      
            return done(null, false);

            });
          
     }catch(error){
         done(error,false);
    }

}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    // passport by default use username and password for authentication
    usernameField: 'email' //so this sets email instead of username

}, (email, password, done)=>{

    // Find the user given the email
    user.findOne({where:{email:email}}).then(function(foundUser){
        const isValid = isValidPassword(password,foundUser.password);
         if(!isValid){
        return done(null,false);
        }
    done(null,foundUser);
    }).catch(function(error){
return done(null,false);
    });
/*
    // If not, handle it
    if(!foundUser){
        return done(null,false);
    }
    // Check is the password is correct
    const isValid = isValidPassword(password,foundUser.password);
    if(!isValid){
        return done(null,false);
    }
    // Otherwise, return the user
    done(null,foundUser);
    */
}));