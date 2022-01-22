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

const generateToken = (user, time = "24h") => {
    return jwt.sign({ id: user._id, email: user.email },
        "chidimma", { expiresIn: time })
}

const verifyToken = (token) => {
    return jwt.verify(token, "chidimma")
}

module.exports = {
    hashPassword,
    dehashPassword,
    generateToken,
    verifyToken
}