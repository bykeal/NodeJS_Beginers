const express = require('express');
const userController = require('../controller/user.controller');

require('express-async-errors');

const router = express.Router();

router.post("/register", userController.create)

module.exports = router;
