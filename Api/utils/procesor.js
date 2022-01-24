const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)

}

const dehashPassword = async (password, hashedpassword) => {
    return bcrypt.compare(password, hashedpassword);
}

const generateToken = (user, time = "24h") => {
    console.log(user)
    return jwt.sign({ id: user.id, email: user.email },
        "chidimma", { expiresIn: time })
}

const verifyToken = async (token) => {
   const result = await jwt.verify(token, "chidimma");
   return result;
}

module.exports = {
    hashPassword,
    dehashPassword,
    generateToken,
    verifyToken
}