/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> npm start
 * 
 * Purpose    :  Invoke the function of database
 * 
 * @description: 
 * 
 * @file      : service.js
 * 
 * @module    : 
 * 
 * @author    : Avinash Jadhav
 * 
 * @version   :
 * 
 * @since     : 15-06-2021
 ***************************************************************************************/

//Importing model
const userSchema = require("../models/user")

//Importing middleware
const Helper = require("../middleware/helper");
const sendEmail = require("../util/forgotpassword")
const bcrypt = require("bcrypt")
const  Schema  = require("mongoose");
const user = require("../controllers/user");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken")

class ServiceClass {

  /**
   * 
   * @param {*} inputUser express property
   * @param {*} callback express property
   * @returns callback
   */
   registerNewUser = (inputUser, callback) => {
      try {
        //calling the method to create new employee object with given data
        userSchema.newUserRegistration(inputUser, (err, data) => {
          return err ? callback(err, null) : callback(null, data);
        });
      } catch (err) {
        callback(err || 'Some error occurred!', null);
      }
    };

    //login user
    userLogIn = (credential, callback) => {
        userSchema.loginUser(credential,(err,data) => {
          return err ? callback(err, null)
              :(!Helper.passwordCheck(credential.password, data.password)) ? callback("Incorrect password", null)
              : callback(null, Helper.generateToken(credential)) 
          })
    }

    //requestfor resetPassword
    requestForgotPassword = (email, callback) => {
      let link; 
      let newToken;
        userSchema.forgotPassword(email, (err,data) => {
          return err ? callback(err, null)
             : newToken = Helper.generateToken(data),
               link = `${process.env.CLINTURL}/passwordReset/${newToken}`,

               sendEmail(data.email, "Password Reset Request", link),

               callback(null, link)
          })
    };

    //resetpassword
    passwordReset = (userInput, calllback) => {
      console.log("input token=",userInput.token);
      var decode = jwt.decode(userInput.token)
      console.log("user=", decode);
    
      
    }
}  
      
//exporting class
module.exports = new ServiceClass()