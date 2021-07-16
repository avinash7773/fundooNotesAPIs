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
 * @since      : 23-06-2021 
 *********************************************************************************************/

//import servicess
const service = require("../service/user")

//importing middleware validator
const userInput  = require("../middleware/uservalidator");
const logger = require("../../config/logger")


class UserController {
   
  /**function to call registerNewUser function from service/user.js that register user
   *  into userSchema 
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
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

    /**function to call userLogIn from service/user.js that 
     * check user log in
     * 
     * @param {*} req 
     * @param {*} res 
     */
    loginUser(req, res) {
      const userCredentials = {
        email: req.body.email,
        password: req.body.password,
      };
      service.userLogIn(userCredentials, (err, data) => {
        return err
          ? res.status(400).send({ success: false, message: err })
          : res.status(200).send({ success: true, message: 'Log in Successfully!!!!', data});
      });
    }

    /**function to call requestForgotPassword 
     * from service/user.js 
     * 
     * @param {*} req 
     * @param {*} res 
     */
     forgotPasswordController(req, res) {
       var userData = {
        email: req.body.email,
      }
        service.forgotPassword(userData, (err, data) => {
           return err ? res.status(400).send({success : false, message : err})
          : res.status(200).send({ success: true, message: 'link sent Successfully!!!!', data});
      });
    };

    /**
     * function first validate incomig request 
     * and call passwordReset function from service.js
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    resetPassword(req, res) {

      try{
      //inputrequest validate
      const userInputValidation = userInput.validate(req.body);
        if (userInputValidation.error) {
          logger.error(userInputValidation.error.details[0].message)
          return res.status(400).send({
            success: false,
            message: userInputValidation.error.details[0].message,                   
            data: req.body,
          });
        }
      
      let userData = {
        token : req.headers.token,
        password : req.body.password
      }
      service.passwordReset(userData, (err, data) => {
        return err ? res.status(400).send({success : false, message : err})
        : res.status(200).send({success : true, message : "Password reset Successfully!!!", data})
      })
    }catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message || 'Invalid Password!!!!',
      });
    }


 }
}

//Exporting class
module.exports = new UserController();




 



