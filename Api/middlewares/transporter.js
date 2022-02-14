const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVICE,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER, // generated gmail user
                pass: process.env.MAIL_PASS // generated gmail account password
            }

});

transporter.use('compile', hbs({ 
    viewEngine: 'express-handlebars',
    viewPath: '../../views/'
}))
//   var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!',
        // template: 'index'
//   };

// ..................................

// var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     html: '<h1>Welcome</h1><p>That was easy!</p>'
//   }

const sendone = async (mailOptions) => {
   const resp = await transporter.sendMail(mailOptions);
   return resp;
}

  
 module.exports = {
     sendone,
 }