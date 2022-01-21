const userService = require('../services/user.service');
const CustomError = require("../utils/custom.error");

class userController {

    async create(req,res,next){
            const result = await userService.register(req.body);
            console.log(result);
            res.status(201).send({success: "true", response : "Welcome" , 
            data : result}); 
    }
}

module.exports = new userController();