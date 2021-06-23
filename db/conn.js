const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fundooNotes", {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("connection successfully to database")
}).catch((e) => {
    console.log("No connection to database")
})