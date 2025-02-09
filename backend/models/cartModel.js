const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: String,
    cart:Array
})

const cartModel = mongoose.model('Cart',cartSchema)

module.exports = cartModel