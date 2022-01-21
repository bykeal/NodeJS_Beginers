const usermodel = require("../model/user.model");
const CustomError = require("../utils/custom.error");

class userService {
    async register(data){
        const {email , name , password} = data;
        console.log(email, " + " , name);

        const existingemail = await usermodel.find({email});
        console.log(existingemail);
        if(existingemail.length > 0) throw new CustomError("email already exist!!!");

        const existingname = await usermodel.find({name});
        if(existingname.length > 0) throw new CustomError("username already exist!!!");

        if(name == password) throw new CustomError("username and password can't be the same");

        const user = new usermodel({
            name: data.name,
            email: data.email,
            password: data.password,
            verified: 0
        });
        return user.save();

    }
}

module.exports = new userService();