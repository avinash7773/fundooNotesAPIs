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
    //getEmail
    getEmailFromToken(token) {
      const decoded = jwt.verify(token, process.env.SECRETKEY);
      return decoded.email
  }
  
    //generating token
    generateToken(userData) {
      return jwt.sign(userData, process.env.SECRETKEY,);
    
    }

}

module.exports =  new Helper();