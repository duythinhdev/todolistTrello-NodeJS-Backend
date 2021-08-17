const mongoose = require('mongoose');


const mainDetailSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: {type: String},
        order: {type: Number}
    },
    {TaskId: [{_id: Number}]},
    {timestamps: {createdAt: true, updatedAt: false}}
)


module.exports = mongoose.model("MainDetail", mainDetailSchema)
