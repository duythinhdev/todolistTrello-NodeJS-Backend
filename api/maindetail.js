const express = require('express');
const router = express.Router();
const MainDetailController = require("../controller/main/mainDetail/mainDetail");

router.post("/posttaskDetail",MainDetailController.postTodoDetail);


module.exports = router;
