//importing bcrypt
const bcrypt = require("bcrypt");

//importing jwt
const jwt = require("jsonwebtoken"); 

//importing .env
require("dotenv").config();

class Helper {
  passwordCheck(userPassword, dbPassword) {
        const isMatch = bcrypt.compareSync(userPassword, dbPassword);
        if(isMatch) return true;
        return false;
    }

    //generating token
    generateToken(credential) {
       return jwt.sign({_id : credential._id}, process.env.SECRETKEY);

    }

}

module.exports =  new Helper();