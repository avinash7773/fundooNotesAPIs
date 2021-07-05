/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> npm start
 * 
 * Purpose    :  Schema for registration
 * 
 * @description: contain schema  and methods for user registration and save user
 * 
 * @file       : model.js
 * 
 * @module     : 
 * 
 * @author     : Avinash Jadhav
 * 
 * @version    :
 * 
 * @since      : 15-06-2021
 ******************************************************************************************************/

//Importing mongoose 
const mongoose = require("mongoose");

const validator = require("validator");
const { schema } = require("../middleware/uservalidator");

//importing bcrypt module
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 8;

//create userSchema
const userSchema =  new mongoose.Schema({
    firstName : {},
    lastName : {},
    email : {},
    password : {}
});

const Schema = mongoose.model('userSchemaModel', userSchema);

class RegisterUser{
    
    //Register new user
    newUserRegistration = (inputUser, callback) => {
      try {

        //creating new user
        const user = new Schema({
          firstName: inputUser.firstName,
          lastName: inputUser.lastName,
          email: inputUser.email,
          password: inputUser.password,
        });
  
        //to save the new user
        user.save((err, data) => {
          return err ? callback(err, null) : callback(null, data);
        });
      } catch (err) {
        return callback(err, null);
      }
    }; 

    //login user
        loginUser(credential, callback) {
        Schema.findOne({email : credential.email}, (err, data) => {
          if(err) {
            return callback(err, null)
          } else if(!data) {
            return callback("Email not found", null)
          }
          return callback(null, data)
      });
    }
}

//exporting registerUser
module.exports = new RegisterUser();


