const mongoose = require("mongoose");
const Option = require("../../models/option");
const PAGE_SIZE = 10;
exports.postOption = (req, res, next) => {
    const option = new Option({
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        quantity: req.body.quantity,
        product_id: req.body.product_id,
    })
    option.save().then((response) => {
        res.status(200).json({
            data: "Bạn đã thêm thành công"
        })
    }).catch((err) => {
        res.status(400).json({
            err: err
        })
    })

}
exports.getOption = async(req, res, next) => {
    var page = req.query.page;
    if (page) {
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }
        var skipOption = (page - 1) * PAGE_SIZE;
        var totalPage;
        await Option.find({}).exec().then((response) => {
            Option.count({}, (err, counts) => {
                totalPage = counts;
            })
        })
        await Option.find({})
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

    await Option.find({}).exec().then((response) => {
            Option.count({}, (err, counts) => {
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
exports.getOptionDetail = (req, res, next) => {
    var id = req.params.id
    Option.findById(id).then((response) => {
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
exports.putOption = async(req, res, next) => {
    var type = req.body.type;
    var size = req.body.size;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var product_id = req.body.product_id;
    var id = req.query.id;
    await Option.updateOne({ _id: id }, {
            $set: {
                type: type,
                size: size,
                price: price,
                quantity: quantity,
                product_id: product_id,
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
exports.deleteOption = async(req, res, next) => {
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