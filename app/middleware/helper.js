//importing bcrypt
const bcrypt = require("bcrypt");

class Helper {
    passwordCheck(userPassword, dbPassword) {
        return userPassword && dbPassword ?
        bcrypt.compareSync(userPassword, dbPassword) : false;
    }
}

module.exports =  new Helper();