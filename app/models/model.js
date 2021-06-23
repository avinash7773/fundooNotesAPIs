const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
    firstName : {
              type : String,
              required : true,
              unique : true
    }, 
    lastName : {
              type : String,
              required : true,
              unique : true
    },
    email :   {
            type : String,
            required : true,
            unique : true
    },
    password :{
            type : String,
            required : true,
            unique : true
    }
});

const schema = mongoose.model('userSchemaModel',userSchema);

class RegisterUser{
    //Register new user
    newUserRegistration = (newUser, callback) => {
      try {
        const user = new schema({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password,
        });
  
        //to save the new user
        user.save((err, data) => {
          return err ? callback(err, null) : callback(null, data);
        });
      } catch (err) {
        return callback(err, null);
      }
    };
}

//exporting schema of database
module.exports = new mongoose.model("userSchemaModel", userSchema);
module.exports = new RegisterUser();


