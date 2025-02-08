const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    gmail: String,
    passWord: String,
})

const loginModel = mongoose.model('Login',loginSchema)

module.exports = loginModel;
