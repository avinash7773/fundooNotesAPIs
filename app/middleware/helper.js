//importing bcrypt
const bcrypt = require("bcrypt");

//importing jwt
const jwt = require("jsonwebtoken"); 

//importing .env
require("dotenv").config();

class Helper {
  passwordCheck(userPassword, dbPassword) {
       return userPassword && dbPassword ? bcrypt.compareSync(userPassword, dbPassword)
         : false
    }

    //generating token
    generateToken(credential) {
       return jwt.sign({_id : credential._id}, process.env.SECRETKEY,);
    }

}

module.exports =  new Helper();