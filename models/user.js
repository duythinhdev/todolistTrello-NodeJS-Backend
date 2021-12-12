const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true },
    permission: { type: Number, required: false },
    full_name: { type: String, required: false },
    address: { type: String, required: false },
    is_active: { type: Number, required: false },
})

module.exports = mongoose.model("User", userSchema)