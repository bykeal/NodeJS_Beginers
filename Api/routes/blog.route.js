const express = require('express');
const blogController = require('../controller/blog.controller');

const router = express.Router();

router.get("/", blogController.getAll);
router.get("/getbyid", blogController.getOne);
router.post("/", blogController.create);
router.delete("/:blogId", blogController.delete);
router.patch("/update", blogController.update);

module.exports = router;
