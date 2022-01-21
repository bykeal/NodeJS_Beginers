const usermodel = require("../model/user.model");
const CustomError = require("../utils/custom.error");

class userService {
    async register(data){
        const {email , name} = data;

        const existingemail = await usermodel.find({email});
        if(existingemail) throw new CustomError("email already exist!!!");

        const existingname = await usermodel.find({name});
        if(existingname) throw new CustomError("username already exist!!!");

        const user = new usermodel({
            name: data.name,
            email: data.email,
            password: data.password
        });
        return user.save();

    }
}

module.exports = new userService();