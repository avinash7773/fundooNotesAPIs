
const service = require("../service/service")

//importing middleware validator
const userInput  = require("../middleware/uservalidator")

class UserController {
   
  registerUser = (req, res) => {
      try {
        const userInputValidation = userInput.validate(req.body);
        if (userInputValidation.error) {
          return res.status(400).send({
            success: false,
            message: userInputValidation.error.details[0].message,                   
            data: req.body,
          });
        }
       
        //calling method to add new user data
        service.registerNewUser(req.body, (err, data) => {
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




 



