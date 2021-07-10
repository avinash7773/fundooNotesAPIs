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
const Token = require("../models/token");
const  Schema  = require("mongoose");
const user = require("../controllers/user");
const SALT_ROUNDS = 10;

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
          if(err) {
            return callback(err, null)
          }
          else if(!Helper.passwordCheck(credential.password, data.password)) {
            return callback("Incorrect password", null)
          }
          var token = Helper.generateToken(credential)
          return callback(null, token) 

        })
    }

    requestResetPassword = (email, callback) => {
        userSchema.forgotPassword(email, (err,data) => {
          if(err) {
            return callback(err, null)
          } else {
              let newtoken = Helper.generateToken(data.email)
              const tokenSchema = new Token({
                      userId : data._id,
                      token: newtoken,
                      createdAt: Date.now(),
                }).save()
            
              const link = `${process.env.CLINTURL}/passwordReset?token=${newtoken}&id=${user._id}`;
              sendEmail(data.email, "Password Reset Request", link)
              return callback(null, link)
        }
    });
}}

//exporting class
module.exports = new ServiceClass()