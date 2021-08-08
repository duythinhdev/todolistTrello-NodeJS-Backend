const mongoose = require('mongoose');

const mainSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    order: { type: Number }
},
    { timestamps: { createdAt: true, updatedAt: false }}
)

module.exports = mongoose.model("Main",mainSchema)
