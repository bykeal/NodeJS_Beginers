const express = require('express');
const blogController = require('../controller/blog.controller');
const {blogSchema} = require("../validators/blog.schema");
const validators = require("../validators/validate");

 require('express-async-errors');

const router = express.Router();

router.get("/", blogController.getAll);
router.get("/getbyid", blogController.getOne);
router.post("/", validators(blogSchema) , blogController.create);
router.delete("/delete", blogController.delete);
router.patch("/update", blogController.update);

module.exports = router;
