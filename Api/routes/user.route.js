const express = require('express');
const userController = require('../controller/user.controller');

require('express-async-errors');

const router = express.Router();

router.post("/", userController.create)
router.post("/login", userController.login)
router.post("/email", userController.email)
router.get("/verifyemail/:token", userController.verify)
// router.post("/check", userController.check)


module.exports = router;
