const Main = require("../../models/main");
const mongoose = require("mongoose");
exports.postTodo = (req, res, next) => {
    const content = new Main({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
    })
    content.save().then((user) => {
        res.status(200).json({
            data: "Bạn đã thêm thành công"
        })
    }).catch((err) => {
        res.status(400).json({
            err: err
        })
    })
}
exports.getTodo = async(req, res, next) => {
    await Main.find().select('title content _id')
        .exec().then((response) => {
            return res.status(200).json({
                data: response
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            })
        })
        // }
}
exports.putTodo = async(req, res, next) => {
    const title = req.body.title;
    const id = req.query.id;
    await Main.updateOne({ _id: id }, {
            $set: { title: title }
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "update todo",
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}

exports.deleteTodo = async(req, res, next) => {
    const id = req.query.id;
    await Main.remove({ _id: id }).exec().then(response => {
        res.status(200).json({
            message: "delete todo",
        })
    }).catch(err => {
        res.status(500).json({ error: err })
        console.log(err);
    })
}