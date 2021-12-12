const express = require('express');
const router = express.Router();
const optionController = require("../controller/option/option");

router.post("/post", optionController.postOption);
router.get("/getall", optionController.getOption);
router.get("/getdetail/:id", optionController.getOptionDetail);
router.put("/put", optionController.putOption);
router.delete("/delete", optionController.deleteOption);

module.exports = router;