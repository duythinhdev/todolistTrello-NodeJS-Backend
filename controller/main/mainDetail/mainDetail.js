const MainDetail = require("../../../models/maindetail");
const mongoose = require("mongoose");

exports.postTodoDetail = (req,res,next) => {
    const MainDetail = new MainDetail({
        _id: mongoose.Schema.Types.ObjectId,
        title: req.body.title,
        order: req.body.order,
        TaskId: req.body.id
    })
    MainDetail.save().then(response=>{
        res.status(200).json({
            message: "thêm thành công"
        })
    }).catch(err=>{
        res.status(400).json({
            message: "thêm không thành công"
        })
    })
}
