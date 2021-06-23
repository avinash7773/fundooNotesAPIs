//importing joi validator
const Joi = require("@hapi/joi");

//validate input object
const userInput  = Joi.object({
    firstName : Joi.string()
                .min(2)
                .max(20)
                .pattern(new RegExp("^[A-Z]{1}[A-Za-z]{2,}"))
                .required(),
    lastName : Joi.string()
                .min(2)
                .max(20)
                .pattern(new RegExp("^[A-Z]{1}[A-Za-z]{2,}"))
                .required(),
    email    :  Joi.string()        
                .pattern( new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"))
                .required(),
    password : Joi.string()
                .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"))
                .required()
})

module.exports = userInput;

