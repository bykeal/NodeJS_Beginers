const express = require('express');
const Blog = require('./Api/routes/blog.route');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.wnqd5.mongodb.net/${process.env.MONGO_DB_PASSWORD}?retryWrites=true&w=majority`);

// mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.wnqd5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then((res)=>{
//     console.log('connection succesfull');
// });

app.use(morgan("dev")); //middleware

app.use(bodyParser.json());

app.get("/", (req,res) => {
 res.status = 200;
 res.json({response: "server is live"});
});

app.use("/blog", Blog);

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