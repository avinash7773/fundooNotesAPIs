const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
    firstName : {},
    lastName : {},
    email : {},
    password : {}
});

const Schema = mongoose.model('userSchemaModel',userSchema);

class RegisterUser{
    //Register new user
    newUserRegistration = (inputUser, callback) => {
      try {
        const user = new Schema({
          firstName: inputUser.firstName,
          lastName: inputUser.lastName,
          email: inputUser.email,
          password: inputUser.password,
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

// //exporting schema of database
// module.exports = schema;

//exporting registerUser
module.exports = new RegisterUser();


