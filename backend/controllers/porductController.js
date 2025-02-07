exports.getProducts = (req,res,next) =>{
    res.json({
        success: true,
        message: 'Get products working!'
    })
}
exports.getSingleProduct = (req,res,next) =>{
    res.json({
        success: true,
        message: 'Get Single product working!'
    })
}