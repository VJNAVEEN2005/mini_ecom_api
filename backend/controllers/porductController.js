const productModel = require('../models/productModel')
const ProductModel = require('../models/productModel')

// Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
    const products = await ProductModel.find({})
    res.json({
        products
    })
}

// Get Single Product API - /api/v1/products/:id
exports.getSingleProduct = async (req, res, next) => {

    try {
        console.log(req.params.id)
        const product = await productModel.findById(req.params.id);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }


}