const express = require('express');
const blogController = require('../controller/blog.controller');
const {blogSchema} = require("../validators/blog.schema");
const validators = require("../validators/validate");
const { authenticate } = require("../middlewares/auth.middleware");

require('express-async-errors');

const router = express.Router();

router.get("/", blogController.getAll);
router.get("/getbyid", blogController.getOne);
router.post("/", authenticate, validators(blogSchema) , blogController.create);
router.delete("/delete", blogController.deleteById);
router.delete("/deleteAll", blogController.delete);
router.patch("/update", authenticate, blogController.update);

module.exports = router;
