const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/procesor");
const userService = require("../services/user.service");
const CustomError = require('../utils/custom.error');

const authenticate = async (req, res, next) => {

    const token = req.headers["x-auth-token"]
    console.log(token)
    if (!token) throw new CustomError("Not Authorized access", 401)
    try {
        const decodedUser = await verifyToken(token)
        // console.log('decoded = ',decodedUser)
        const user = await userService.findByEmail(decodedUser.email)
        // console.log('user = ',user);
        if (!user) throw new CustomError("User does not exist", 401)
        res.locals.author = decodedUser.email;
        res.locals.pin = decodedUser.id;
        next()
    }
    catch (err) {
        const erred = new CustomError(err, 403);
        next(erred)
    }
} 

module.exports = {
    authenticate
}