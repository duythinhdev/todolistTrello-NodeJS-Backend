const express = require('express');
const router = express.Router();
const MainController = require("../controller/main/main");
const checkMiddle = require("../middleware/middleware");

router.post("/posttask",MainController.postTodo);
router.get("/gettask",MainController.getTodo);
router.put("/puttask",MainController.putTodo);
router.delete("/deletetask",MainController.deleteTodo);

module.exports = router;
