
/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> npm start
 * 
 * Purpose    :  Validation Input User property
 * 
 * @description:
 * 
 * @file      : uservalidator.js
 * 
 * @module    :
 * 
 * @author    : Avinash Jadhav
 * 
 * @version   :
 * 
 * @since     : 15-06-2021
 ************************************************************************************************/

//importing joi validator
const Joi = require("@hapi/joi");

//validate input object
const userInput  = Joi.object({
    firstName : Joi.string()
                .min(2)
                .max(20)
                .pattern(new RegExp("^[A-Z]{1}[A-Za-z]{2,}")),
    lastName : Joi.string()
                .min(2)
                .max(20)
                .pattern(new RegExp("^[A-Z]{1}[A-Za-z]{2,}")),
    email    :  Joi.string()        
                .pattern( new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$")),
    password : Joi.string()
                .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")),
})


module.exports = userInput;

