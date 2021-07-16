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
 * @author    : Avinash Jadhav <javinash228@gmail.com>
 * 
 * @version   :
 * 
 * @since     : 23-06-2021
 ***************************************************************************************/

//Importing model
const userSchema = require("../models/user")
const Helper = require("../middleware/helper");
const sendEmail = require("../util/forgotpassword")
const bcrypt = require("bcrypt")
const  Schema  = require("mongoose");
const user = require("../controllers/user");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken")

class ServiceClass {

  /**function to call newUserRegistration
   *  from model/user.js that is create new user data
   * 
   * @param {*} inputUser express property
   * @param {*} callback express property
   * @returns callback
   */
   registerNewUser = (inputUser, callback) => {
      try {
        userSchema.newUserRegistration(inputUser, (err, data) => {
          return err ? callback(err, null) : callback(null, data);
        });
      } catch (err) {
        callback(err || 'Some error occurred!', null);
      }
    };

    /**function to call loginUser from model/user.js
     * and call passwordCheck function from middleware/helper.js
     * 
     * @param {*} credential 
     * @param {*} callback  
     */
    userLogIn = (credential, callback) => {
        userSchema.loginUser(credential,(err,data) => {
          return err ? callback(err, null)
              :(!Helper.passwordCheck(credential.password, data.password)) ? callback("Incorrect password", null)
              : callback(null, Helper.generateToken(credential)) 
          })
    }

    /**function to call forgotPassword from model/user.js,
     * crate link and call sendEmail function from util/forgotpassword.js 
     * 
     * @param {*} email 
     * @param {*} callback 
     */
    forgotPassword = (email, callback) => {
      let link; 
      let newToken;
        userSchema.getUser(email, (err,data) => {
          try{
          return err ? callback(err, null)
              : !data ? callback(err, null)
              : newToken = Helper.generateToken(email),
               link = `${process.env.CLINTURL}/passwordReset/${newToken}`,
               sendEmail(data.email, "Password Reset Request", link),
               callback(null, link)
          } catch (err) {
            return err;

          }
          })
    };

    /**function to call getEmailFromToken from middleware/helper.js,
     * and call updatePassword from model/user.js 
     * 
     * @param {*} userInput 
     * @param {*} callback 
     */
    passwordReset = (userInput, callback) => {
      var  email = Helper.getEmailFromToken(userInput.token)
      var inputData = {
        email : email,
        password : userInput.password
      }

      userSchema.updatePassword(inputData, (err, data) => {
            return err ? callback(err, null) 
            : callback(null, data)
      }) 
    }
}  
      
//exporting class
module.exports = new ServiceClass()