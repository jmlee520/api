const bcrypt = require('bcrypt'),
{ user }        = require('../models');

//create object
var middlewareObj = {};

/**
 * password validate password using bcrypt module
 * @param: password{string}, hashedPassword{string}
 * @return: user{json} : user object
 */
middlewareObj.isValidPassword = (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * check email duplication
 * @param: Object req, Object res, callback function next
 * @return: boolean
 */
middlewareObj.isUserExist = (req,res,next) => {
user.find({where:{email:req.body.email}}).then(function(userExist){
    if(userExist){

    res.send("message: user already exist, TODO redirect to registration page");
    }else{
        next();
    }
}).catch((error)=>{
     throw new Error('database error');
});

}

/**
 * password validate password using bcrypt module
 * @param: password{string}, hashedPassword{string}
 * @return: user{json} : user object
 */
middlewareObj.isAdmin = ()=>{

}

/**
 * password validate password using bcrypt module
 * @param: password{string}, hashedPassword{string}
 * @return: user{json} : user object
 */
middlewareObj.checkAllowance = ()=>{

};

/**
 * 
 * @param: 
 * @return: 
 */
middlewareObj.isVerified = ()=>{

};

/**
 * 
 * @param: 
 * @return: 
 */
middlewareObj.isOwnerOfComment = ()=>{

};

module.exports = middlewareObj;