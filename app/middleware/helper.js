/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> nodemon  start
 * 
 * Purpose    :  checking password, generating token, decoding token
 * 
 * @description : this is used for middleware processing
 * 
 * @file        : helper.js
 * 
 * @overview    : passwordcheck, generating token, decoding token
 * 
 * @module      : 
 * 
 * @author      : Avinash Jadhav <javinash228@gmail.com>
 * 
 * @since       : 23/06/2021
 */
//importing bcrypt
const bcrypt = require("bcrypt");

//importing jwt
const jwt = require("jsonwebtoken"); 

//importing .env
require("dotenv").config();

class Helper {

  /**function is for checkpassword 
   * userpassword and dbpassword
   * 
   * @param {*} userPassword 
   * @param {*} dbPassword 
   * @returns 
   */
  passwordCheck(userPassword, dbPassword) {
       return userPassword && dbPassword ? bcrypt.compareSync(userPassword, dbPassword)
         : false
    }

    /**function is for decoding token 
     * and return email
     * @param {*} token 
     * @returns 
     */
    getEmailFromToken(token) {
      const decoded = jwt.verify(token, process.env.SECRETKEY);
      return decoded.email
  }
  
    /**
     * function if for ganerating token
     * @param {*} userData 
     * @returns 
     */
    generateToken(userData) {
      return jwt.sign(userData, process.env.SECRETKEY,);
    
    }

}

module.exports =  new Helper();