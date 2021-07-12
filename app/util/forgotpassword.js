const { compile } = require("@hapi/joi");
const nodemailer = require("nodemailer");
require("dotenv").config();



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