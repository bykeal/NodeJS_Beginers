const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { sendone } = require("../middlewares/transporter")

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

const sendverification = async(user) =>{
        const token = generateToken(user, "5s");
        let result = "";
        var mailOptions = {
            from: '',
            to: user.email,
            subject: 'verification email',
            html: `<h1>Welcome</h1><p>click on the link below for verification!</p><p><b>localhost:8000/blog/verifyemail/`+token+`</b></p>`
        }
        await sendone(mailOptions).then(
            res => {
                console.log(res);
            }
        )
        .catch(err =>{
            next(err);
        });
}

module.exports = {
    hashPassword,
    dehashPassword,
    generateToken,
    verifyToken,
    sendverification
}