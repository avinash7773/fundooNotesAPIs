/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> npm start
 * 
 * Purpose    :  controlles the operation of user registration
 * 
 * @description: 
 * 
 * @file       : controller.js
 * 
 * @overview   : controll user registration 
 * 
 * @module     : It is for new user registration
 * 
 * @author     : Avinash Jadhav
 * 
 * @version    :
 * 
 * @since      : 15-06-2021 
 *********************************************************************************************/

//import servicess
const service = require("../service/user")

//importing middleware validator
const userInput  = require("../middleware/uservalidator");
const logger = require("../../config/logger")


class UserController {
   
  registerUser = (req, res) => {
      try {

        //Validate user input
        const userInputValidation = userInput.validate(req.body);
        if (userInputValidation.error) {
          logger.error(userInputValidation.error.details[0].message)
          return res.status(400).send({
            success: false,
            message: userInputValidation.error.details[0].message,                   
            data: req.body,
          });
        }
       
        //calling method to add new user data
        service.registerNewUser(req.body, (err, data) => {
          return err
           ? res.status(500).send({
                success: false,
                message: err.message || 'Some error occurred while adding user',
              })
            : res.status(201).send({
                success: true,
                message: 'User registered successfully',
                data: data,
              });
        });
      } catch (err) {
        return res.status(500).send({
          success: false,
          message: err.message || 'Some error occurred!',
        });
      }
    };

    //login user
    loginUser(req, res) {
      const userCredentials = {
        email: req.body.email,
        password: req.body.password,
      };
 
      //calling a function to login user
      service.userLogIn(userCredentials, (err, data) => {
        return err
          ? res.status(400).send({ success: false, message: err })
          : res.status(200).send({ success: true, message: 'Log in Successfully!!!!', data});
      });
    }

     resetPasswordRequestController(req, res) {
        service.requestResetPassword(req.body.email, (err, data) => {
           return err ? res.status(400).send({success : false, message : err})
          : res.status(200).send({ success: true, message: 'link sent Successfully!!!!', data});
            
       
        });
   //   return res.json(requestPasswordResetService)
    };
}

//Exporting class
module.exports = new UserController();




 



