const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:String,
    cartItems: Array,
    amount: String,
    status: String,
    paymentNumber:String,
    createdAt: Array
})

const orderModel = mongoose.model('Order',orderSchema)

module.exports = orderModel