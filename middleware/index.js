const bcrypt = require('bcrypt');



var middlewareObj = {};

middlewareObj.isValidPassword = (password, hashedPassword) => {
    try {

        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(error);
    }

}

middlewareObj.isUserExist = () => {

}

middlewareObj.isAdmin = ()=>{

}

middlewareObj.checkAllowance = ()=>{};

middlewareObj.isVerified = ()=>{};

module.exports = middlewareObj;