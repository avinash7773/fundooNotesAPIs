/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> nodemon  start
 * 
 * Purpose    :  sending mail to user
 * 
 * @description : send mail to user
 * 
 * @file        : forgotpassword.js
 * 
 * @overview    : send mail to user
 * 
 * @module      : send mail
 * 
 * @author      : Avinash Jadhav <javinash228@gmail.com>
 * 
 * @since       : 23/06/2021
 */
const nodemailer = require("nodemailer");
require("dotenv").config();

/**function is for sending mail to user 
 * using nodemailer 
 * 
 * @param {*} email 
 * @param {*} subject 
 * @param {*} link 
 * @returns 
 */
const sendEmail = async (email, subject, link) => {
 
  try {
      const transporter = nodemailer.createTransport({
        host: process.env.Host,
        service : "gmail",
        port : 467,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS, 
        },
      });
  
     // Send email
      transporter.sendMail({
        from : process.env.USER,
        to : email, 
        subject : subject,
        html :`
        <h2>Please click on below link</h2>
        <p>${link}</p>`
      })
    } catch (error) {
      return error;
    }
}

module.exports = sendEmail;