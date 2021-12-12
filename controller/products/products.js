const Product = require("../../models/product");

exports.postProduct = (req, res, next) => {
    const product = new Product({
        Product_name: req.body.Product_name,
        productImage: req.file.path,
        description: req.body.description,
        id_categoryProduct: req.body.id_categoryProduct,
    })
    product.save().then((product) => {
        res.status(200).json({
            data: "Bạn đã thêm thành công"
        })
    }).catch((err) => {
        res.status(400).json({
            err: err
        })
    })
}
exports.getProduct = async(req, res, next) => {
    var page = req.query.page;
    if (page) {
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }
        var skipOption = (page - 1) * PAGE_SIZE;
        var totalPage;
        await Product.find({}).exec().then((response) => {
            Product.count({}, (err, counts) => {
                totalPage = counts;
            })
        })
        await Product.find({})
            .skip(skipOption)
            .limit(PAGE_SIZE).then((response) => {
                return res.status(200).json({
                    total: totalPage,
                    data: response
                })
            }).catch(err => {
                return res.status(404).json({
                    error: err
                })
            })
        return;
    }

    await Product.find({}).exec().then((response) => {
            Product.count({}, (err, counts) => {
                if (err) {
                    return res.status(404).json({
                        error: err
                    })

                } else {
                    return res.status(200).json({
                        totalPage: counts,
                        data: response,
                    })
                }
            })
        })
        .catch(err => {
            return res.status(404).json({
                error: err
            })
        })
}
exports.getProductDetail = (req, res, next) => {
    var id = req.params.id
    Product.findById(id).then((response) => {
            return res.status(200).json({
                data: response
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            })
        })
}
exports.putProduct = async(req, res, next) => {
    var Product_name = req.body.Product_name;
    var productImage = req.file.path;
    var description = req.body.description;
    var id_categoryProduct = req.body.id_categoryProduct;
    var id = req.query.id;
    await Option.updateOne({ _id: id }, {
            $set: {
                Product_name: type,
                productImage: size,
                description: description,
                id_categoryProduct: id_categoryProduct,
            }
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "update table Option success",
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}
exports.deleteProduct = async(req, res, next) => {
    const id = req.query.id;
    await Option.remove({ _id: id }).exec().then(response => {
        res.status(200).json({
            message: "delete table Option success",
        })
    }).catch(err => {
        res.status(500).json({ error: err })
        console.log(err);
    })
}