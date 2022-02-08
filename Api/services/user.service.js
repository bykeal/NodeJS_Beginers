const usermodel = require("../model/user.model");
const CustomError = require("../utils/custom.error");
const { hashPassword, dehashPassword , generateToken, verifyToken } = require("../utils/procesor");

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
            hashpassword: await hashPassword(data.password),
            verified: 0
        });
        // const vtoken = generateToken(user);
        return user.save();

    }

    async login(data){
        
        let option ="";
        let retrievedpassword = "";
        let existinguser;
        console.log(data);
         
        if (data.name == ""){

            option = data.email;
            existinguser = await usermodel.find({email : option});
            
            if(existinguser.length > 0){
                // console.log(existinguser[0].verified);
                retrievedpassword = existinguser[0].hashpassword;
            }else{
                throw new CustomError("email does not exist!!!");
            }

        } else{

            option = data.name;
            existinguser = await usermodel.find({name : option});

            if(existinguser.length > 0){
                retrievedpassword = existinguser[0].hashpassword;
            }else{
                throw new CustomError("name does not exist!!!");
            }

        }

        const pass = await dehashPassword(data.password,retrievedpassword);

        // console.log(pass);
        if(!pass) throw new CustomError("incorrect password or username");

        return existinguser;
        
    }

    async getById(id){
        return usermodel.findById(id);
    }

    async findByEmail(email) {
        return usermodel.find({ email });
    }
    async updateVerification(data){
        console.log("data ........................", data);
        const existing = await usermodel.find({email: data.email});
        console.log("data2 ........................", existing);
        if(!existing.length > 0) throw new CustomError("user does not exist exist!!!");
        return usermodel.findByIdAndUpdate(data.id,{verified: 1},{new: true});
        // BlogModel.findOneAndUpdate({email:data.id},{title: data.title, author: data.author},{new: true});
     }
}

module.exports = new userService();