const cartModel = require('../models/cartModel')

exports.AddToCart = async (req, res, next) => {
    const cart = req.body[0]
   // console.log(cart)
    if (await cartModel.exists({ userId: cart.userId })) {
        const userId = cart.userId
        const getcart = await cartModel.find({"userId": userId})
        const _id = getcart._id
        const updatedCart = getcart[0].cart
        cart.cart.forEach(element => {
            updatedCart.push(element)
        });
        const sendCart = {
            "_id" : _id,
            "userId" : userId,
            "cart":updatedCart
        }
        const UpdatedCart = await cartModel.updateOne(sendCart)
        res.json({
            success: true,
            message: "Cart Updated",
            UpdatedCart,
            sendCart
        })
    } else {
        const Cart = await cartModel.create(cart)
        console.log(cart)
        res.json({
            success: true,
            message: "Cart Created",
            Cart
        })
    }

}

exports.GetCart = async (req, res, next) => {
    const userId = req.body.userId
    console.log(userId)
    const Cart = await cartModel.find({
        "userId": userId
    })
    res.json({
        success: true,
        Cart
    })
}