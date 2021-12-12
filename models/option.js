const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        size: { type: String, max: 128, required: true },
        type: { type: String, max: 128, required: true },
        price: { type: Number, max: 128, required: false },
        quantity: { type: Number, max: 128, required: false },
        product_id: { type: Number, max: 128, required: false },
    }, { timestamps: { createdAt: true, updatedAt: true } }

)

module.exports = mongoose.model("Option", userSchema);