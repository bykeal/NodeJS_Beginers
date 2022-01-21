const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)

}

const dehashPassword = async (password, hashedpassword) => {
    const compare = await bcrypt.compare(password, hashedpassword)
    console.log(compare)

}
module.exports = {
    hashPassword,
    dehashPassword,
}