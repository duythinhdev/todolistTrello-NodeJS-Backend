var mongoose = require('mongoose');
const userSchema = mongoose.Schema({
        Product_name: { type: String, required: true },
        productImage: { type: String, required: true },
        description: { type: String, required: false },
        id_categoryProduct: { type: Number, required: false },
    }, { timestamps: { createdAt: true, updatedAt: true } }

)

module.exports = mongoose.model("Product", userSchema)