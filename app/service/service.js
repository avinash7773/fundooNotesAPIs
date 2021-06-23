const userSchema = require("../models/model")

class ServiceClass {
   registerNewUser = (newUser, callback) => {
      try {
        //calling the method to create new employee object with given data
        userSchema.newUserRegistration(newUser, (err, data) => {
          return err ? callback(err, null) : callback(null, data);
        });
      } catch (err) {
        callback(err || 'Some error occurred!', null);
      }
    };
}

module.exports = new ServiceClass();