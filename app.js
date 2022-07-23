const express = require('express');
const Blog = require('./Api/routes/blog.route');
const User = require('./Api/routes/user.route');
var cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CustomError = require("./Api/utils/custom.error");
const app = express(); 
dotenv.config();

var corsOptions = {
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));

mongoose.connect(`mongodb+srv://chibuike:chibyke1935@cluster0.wnqd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .catch(err => {
        throw new CustomError("Connection failed");
    });

app.use(morgan("dev")); //middleware

app.use(bodyParser.json());

app.get("/", (req,res) => {
 res.status = 200;
 res.json({response: "server is live"});
});

app.use("/blog", Blog);
app.use("/user", User);

app.use((req,res,next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.json({success:"false" , error:err.message})
});


module.exports = app;