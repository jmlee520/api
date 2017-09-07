const bcrypt = require('bcrypt'),
      {user} = require('../models')

var middlewareObj = {};

/**
 * using bcrypt to verify password
 * @param String password, String hashedPassword
 * @return Boolean
 */
middlewareObj.isValidPassword = (password, hashedPassword) => {
    try {

        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(error);
    }

}

/**
 * verify admin
 * @param Obejct req, Object res, function next()
 * @return promise<object>
 */
middlewareObj.isAdmin = (req, res,next)=>{
//TODO- need to fix
user.find({where:{id:req.user.id}}).then((foundUser)=>{
    if(foundUser.isAdmin){
         next();
    }
   
}).catch((error)=>{

});

}

/**
 * verify admin
 * @param Obejct req, Object res, function next()
 * @return promise<object>
 */
middlewareObj.isUserExist = (req,res,next) => {
    user.find({where:{email:req.body.email}}).then((userExist)=>{
        if(userExist){
            res.send("email already exist");
        }else{
            next();
        }
    }).catch((error)=>{
        res.status(500).send('Internal Server Error');
    })
}


middlewareObj.checkAllowance = ()=>{

};

middlewareObj.isVerified = ()=>{

};

middlewareObj.isOwnerOfPost = (req,res,next)=>{
    next();
    };

module.exports = middlewareObj;