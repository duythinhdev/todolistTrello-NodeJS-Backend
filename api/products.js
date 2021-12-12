const express = require('express');
const router = express.Router();
const ProductController = require("../controller/products/products");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post("/posts", upload.single('productImage'), ProductController.postProduct);
router.get("/get", ProductController.getProduct);
router.get("/getdetail/:id", ProductController.getProductDetail);
router.put("/put", upload.single('productImage'), ProductController.putProduct);
router.delete("/delete", ProductController.deleteProduct)


module.exports = router;