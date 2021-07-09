/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> npm start
 * 
 * Purpose : Contain routes
 * 
 * @description :
 * 
 * @file : routes.js
 * 
 * @overview : routes for various API
 * 
 * @module : It is use for http method
 * 
 * @author : Avinash Jadhav <javinash228@gmail.com>
 * 
 * @version : ---
 * 
 * @since : 15-06-2021
 *******************************************************************************************/

//importing controllers
const Controller = require("../controllers/user")

/**
 * @description : contain userregistration function and routes
 * 
 * @param {instance} app  (express instance)
 */
module.exports = (app) => {

    //Registration API
    app.post('/register', Controller.registerUser);

    app.post('/Login', Controller.loginUser);

   app.post('/forgotpassword', Controller.resetPasswordRequestController);

}