
const service = require("../service/service")

class UserController {
   registerUser = (req, res) => {
      try {
        //Object for the new user data
        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        };
 
        //calling method to add new user data
        service.registerNewUser(newUser, (err, data) => {
          return err
            ? res.status(500).send({
                success: false,
                message: err.message || 'Some error occurred while adding user',
              })
            : res.status(201).send({
                success: true,
                message: 'User registered successfully',
                data: data,
              });
        });
      } catch (err) {
        return res.status(500).send({
          success: false,
          message: err.message || 'Some error occurred!',
        });
      }
    };
}

module.exports = new UserController();




 



