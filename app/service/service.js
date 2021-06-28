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
const userSchema = require("../models/model")

//Importing middleware
const Helper = require("../middleware/helper");

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
    userLogIn(credential, callback) {
      userSchema.loginUser(credential,(err,data) => {
        if(err) {
          return callback(err, null)
        }
        else if(!Helper.passwordCheck(credential.password, data.password)) {
          return callback("Wrong password", null)
        }
        return callback(null, data)
      })
    }
}

//exporting class
module.exports = new ServiceClass();