const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 2 },
    email: { type: String, required: true, max: 200, min: 6 },
    mob: { type: String, required: true, max: 10, min: 10 },
    address: { type: String, require: true, max: 1024, min: 3 },
    password: { type: String, require: true, max: 1024, min: 6 },
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model("User", userSchema)