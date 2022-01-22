const userService = require('../services/user.service');
const CustomError = require("../utils/custom.error");
const { hashPassword, dehashPassword , generateToken, verifyToken } = require("../utils/procesor");

class userController {

    async create(req,res,next){
            let result = await userService.register(req.body);
            const token = generateToken(result);
            res.status(201).send({success: "true", response : "Welcome" , 
            data : [result, token]}); 
    }

    async login(req,res,next){
        let result = await userService.login(req.body);
        const token = generateToken(result);
        res.status(201).send({success: "true", response : "Welcome" , 
        data : [result, token]}); 
    }

  
}

module.exports = new userController();