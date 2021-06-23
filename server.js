const express = require("express");
const bodyParser = require("body-parser");

//database connection
require("./db/conn")

//create express app
const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

require("./app/routes/routes")(app)

//listening form port
app.listen(3000, (req, res) => {
    console.log("listening form port 3000")
})