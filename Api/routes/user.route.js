const express = require('express');
const userController = require('../controller/user.controller');
// const {blogSchema} = require("../validators/blog.schema");
// const validators = require("../validators/validate");

require('express-async-errors');

const router = express.Router();

router.get("/", userController.create);
// router.get("/changeUsername", blogController.getOne);
// router.post("/changePassword", validators(blogSchema) , blogController.create);
// router.delete("/changeEmail", blogController.delete);
// router.patch("/changeEmail", blogController.update);

module.exports = router;
