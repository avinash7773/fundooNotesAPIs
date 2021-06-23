
const Controller = require("../controllers/controller")

module.exports = (app) => {

    //Registration API
    app.post('/register', Controller.registerUser);

}