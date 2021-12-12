const express = require('express');
const router = express.Router();
const ProductController = require("../controller/product/product");
// const multer = require("multer");
// const upload = require({ dest: "uploads/" });

router.post("/posts", ProductController.postProduct);
// router.get("/get", ProductController.getProduct);
// router.get("/getdetail/:id", ProductController.getProductDetail);
// router.put("/put", ProductController.putProduct);
// router.delete("/delete", ProductController.deleteProduct);


module.exports = router;