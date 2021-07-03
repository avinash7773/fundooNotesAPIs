/**
 * Execution : 1. Default node with npm   cmd> npm server.js
 *             2. If nodemon installed   cmd> npm start
 * 
 * Purpose : Starting point of fundooNotesAPI
 * 
 * @description :
 * 
 * @file : server.js
 * 
 * @overview : server setup
 * 
 * @module : It is necessary to run fundooNotesAPI
 * 
 * @author : Avinash Jadhav <javinash228@gmail.com>
 * 
 * @version :
 * 
 * @since : 15-06-2021
 * 
 * *******************************************************************************************/

//Import express package
const express = require("express");

//database connection
require("./config/database.config")

//create express app
const app = express();

//importing swagger
const swaggerUI = require("swagger-ui-express")
const swaggerDocs = require("./swagger/swagger.json")

app.use('/fundooNotesAPI', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//import dotenv
require("dotenv").config();

const Port = process.env.PORT

//Parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

//// Parse request of content-type - application/json
app.use(express.json())

//calling routes
require("./app/routes/routes")(app)

//listening  port 3000
app.listen(Port, (req, res) => {
    console.log("listening form port 3000")
})


module.exports = app