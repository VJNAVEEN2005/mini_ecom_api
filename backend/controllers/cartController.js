const cartModel = require('../models/cartModel')
const productModel = require('../models/productModel')

exports.AddToCart = async (req, res, next) => {
    try {
        const cart = req.body[0]; // Extract cart from request body

        if (!cart || !cart.userId || !cart.cart || !Array.isArray(cart.cart)) {
            return res.status(400).json({ success: false, message: "Invalid cart data" });
        }

        // Step 1: Merge duplicate product IDs within the request itself
        const mergedRequestCart = {};
        cart.cart.forEach((item) => {
            if (mergedRequestCart[item.productId]) {
                mergedRequestCart[item.productId].quantity += item.quantity;
            } else {
                mergedRequestCart[item.productId] = { ...item };
            }
        });

        const newCartItems = Object.values(mergedRequestCart); // Convert object back to array

        // Step 2: Check if the user already has a cart
        const existingCart = await cartModel.findOne({ userId: cart.userId });

        if (existingCart) {
            // Step 3: Merge with existing cart
            const updatedCart = [...existingCart.cart];

            newCartItems.forEach((newItem) => {
                const existingItem = updatedCart.find(item => item.productId.toString() === newItem.productId);
                if (existingItem) {
                    // If product exists, increase quantity
                    existingItem.quantity += newItem.quantity;
                } else {
                    // If new product, add it to the cart
                    updatedCart.push(newItem);
                }
            });

            // Step 4: Update the cart in the database
            await cartModel.updateOne(
                { userId: cart.userId },
                { $set: { cart: updatedCart } }
            );

            res.json({
                success: true,
                message: "Cart Updated",
                cart: updatedCart
            });

        } else {
            // Step 5: Create a new cart if the user doesn't have one
            const newCart = await cartModel.create({ userId: cart.userId, cart: newCartItems });
            res.json({
                success: true,
                message: "Cart Created",
                cart: newCart
            });
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



exports.GetCart = async (req, res, next) => {
    try {
        const userId = req.body.userId;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch the user's cart
        const Cart = await cartModel.findOne({ userId });

        if (!Cart || !Cart.cart.length) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }

        // Consolidate cart by summing quantities of duplicate product IDs
        const consolidatedCart = {};

        Cart.cart.forEach((item) => {
            if (consolidatedCart[item.productId]) {
                consolidatedCart[item.productId].quantity += item.quantity;
            } else {
                consolidatedCart[item.productId] = { productId: item.productId, quantity: item.quantity };
            }
        });

        // Fetch product details for unique product IDs
        const cartItems = await Promise.all(
            Object.values(consolidatedCart).map(async (item) => {
                const product = await productModel.findById(item.productId);
                return {
                    product,
                    quantity: item.quantity
                };
            })
        );

        res.json({
            success: true,
            cart: cartItems
        });

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
