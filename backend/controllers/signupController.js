const signupModel = require('../models/signupModel')

// Get Products API - /api/v1/signup
exports.CreateUser = async (req, res, next) => {

    const user = req.body
    const User = await signupModel.create(user)

    res.json({
        success: true,
        User
    })

}