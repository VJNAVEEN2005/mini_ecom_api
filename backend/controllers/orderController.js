const cartModel = require('../models/cartModel')
const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')

// Create Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Retrieve the user's cart
        const cart = await cartModel.findOne({ userId });
        if (!cart || cart.cart.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        let totalOriginal = 0;
        let totalCurrent = 0;

        // Calculate totals by iterating through cart items
        for (const item of cart.cart) {
            const product = await productModel.findById(item.productId);
            if (!product) {
              console.error(`Product ${item.productId} not found`);
              continue;
            }
          
            // Check if prices are valid
            const originalPrice = Number(product.Orginalprice);
            const currentPrice = Number(product.CurrentPrice);
            
            if (isNaN(originalPrice) || isNaN(currentPrice)) {
              console.error(`Invalid prices for product ${item.productId}:`, {
                original: product.Orginalprice,
                current: product.CurrentPrice,
              });
              continue; // or throw an error
            }
          
            totalOriginal += originalPrice * item.quantity;
            totalCurrent += currentPrice * item.quantity;
          }

        // Calculate amount and savings
        const amount = totalCurrent;
        const saving = totalOriginal - totalCurrent;

        // Create order with formatted createdAt
        const createdAt = new Date().toISOString(); // Stores date in ISO format (e.g., "2024-03-21T12:34:56.789Z")

        const order = await orderModel.create({
            userId,
            cartItems: cart.cart,
            amount,
            saving: Math.max(saving, 0), // Ensure non-negative savings
            status: "pending",
            paymentNumber: "auhka754sdh",
            createdAt
        });

        res.json({
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};