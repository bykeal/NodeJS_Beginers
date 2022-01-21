const express = require('express');
const userController = require('../controller/user.controller');

require('express-async-errors');

const router = express.Router();

router.post("/", userController.create)
router.post("/login", userController.login)

module.exports = router;