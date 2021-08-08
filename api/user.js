const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const checkmiddle = require("../middleware/middleware");

router.post("/signups",userController.signup);
router.post("/login",userController.login);

module.exports = router;
