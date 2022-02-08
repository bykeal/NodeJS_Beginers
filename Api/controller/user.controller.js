const userService = require('../services/user.service');
const CustomError = require("../utils/custom.error");
const { hashPassword, dehashPassword , generateToken, verifyToken, sendverification } = require("../utils/procesor");
const { sendone } = require("../middlewares/transporter")

class userController {

    async create(req,res,next){
            let result = await userService.register(req.body);
            let user = {
                id: result._id,
                email: result.email
            }
            const sendverifications = sendverification(user);
            console.log(sendverifications);
            const token = generateToken(user);
            res.status(201).send({success: "true", response : "Welcome" , 
            data : [result, token]}); 
    }

    async login(req,res,next){
        let result = await userService.login(req.body);
        // console.log("problem --------------",result);
        const { _id, email } = result[0];
        // console.log("problem --------------", _id , " -----", email );
        const token = generateToken({_id,email});
        res.status(201).send({success: "true", response : "Welcome" , 
        data : [result, token]}); 
    }

    async email(req,res,next){
        let result = "";
        var mailOptions = {
            from: 'okonkwochibuike81@gmail.com',
            to: 'okonkwochibuike80@gmail.com',
            subject: 'Sending Email using Node.js',
            html: '<h1>Welcome</h1><p>That was easy!</p>'
        }
        await sendone(mailOptions).then(res => {
            result = res;
        }).catch(err =>{
            next(err);
        });
        res.status(201).send({success: "true", response : "Welcome" , 
        data : result}); 
    }
    
    async verify(req,res,next){
        const decodedUser = await verifyToken(req.params.token)
        let result = await userService.updateVerification(decodedUser);
        console.log(decodedUser)
        console.log("result from service",result)

        res.status(201).send({success: "true", response : "updated" , 
        data : result}); 
    }
  
}

module.exports = new userController();