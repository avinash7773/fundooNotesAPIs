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
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const Token = require("../models/token");
const  Schema  = require("mongoose");
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

    requestResetPassword = async (email) => {
       try{
        const user = await userSchema.forgotPassword(email);
        
        let resettoken = crypto.randomBytes(23).toString("hex")
        const hash = await bcrypt.hash(resettoken, SALT_ROUNDS)
 
        await new Token({
         userId: user._id,
         token: hash,
         createdAt: Date.now(),
        }).save()
 
        const link = `${process.env.CLINTURL}/passwordReset?token=${resettoken}&id=${user._id}`;
        
        sendEmail(
          user.email,
         "Password Reset Request",
          link
        );
       
        return link;
       }
       catch(err) {
         return err
       }
    };
}


  //exporting class
module.exports = new ServiceClass()