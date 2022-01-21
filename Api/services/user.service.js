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

    async login(data){
        
        let option ="";
        let retrievedpassword = "";
        console.log(data);
         
        if (data.name == ""){

            option = data.email;
            let existinguser = await usermodel.find({email : option});
            
            if(existinguser.length > 0){
                retrievedpassword = existinguser[0].password;
            }else{
                throw new CustomError("email does not exist!!!");
            }

        } else{

            option = data.name;
            let existinguser = await usermodel.find({name : option});

            if(existinguser.length > 0){
                retrievedpassword = existinguser[0].password;
            }else{
                throw new CustomError("name does not exist!!!");
            }

        }

        if(data.password == retrievedpassword){
            return "Welcome";
        }else{
            throw new CustomError("incorrect password or username");
        }


    }
}

module.exports = new userService();