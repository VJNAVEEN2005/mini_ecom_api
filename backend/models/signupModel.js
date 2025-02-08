const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    address: String,
    gmail: String,
    passWord: String,
    createdAt: Date
})

const signupModel = mongoose.model('User',signupSchema)

module.exports = signupModel;
