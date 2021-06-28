
/**
 * Execution :  1. Default node with npm   cmd> npm server.js
 *              2. If nodemon installed    cmd> npm start
 * 
 * Purpose    :  Database connection
 * 
 * @description: 
 * 
 * @file       : database.config.js
 * 
 * @module     :
 * 
 * @author     : Avinash Jadhav
 * 
 * @version   :
 * 
 * @since     : 15-06-2021
 ****************************************************************************************************/

//Import mongoose
const mongoose = require("mongoose");

//import dotenv package
require("dotenv").config();

//create process environment;
var dbUrl = process.env.mongoDBUrl;

//create connection of mongoose and database;
mongoose.connect(dbUrl, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("connection successfully to database")
}).catch((e) => {
    console.log("No connection to database")
})