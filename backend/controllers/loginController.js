const loginModel = require('../models/loginModel')
const signupModel = require('../models/signupModel')

// Get Products API - /api/v1/login
exports.getSingleUser = async (req, res, next) =>{
    try{
        const login = req.body
        const user = await signupModel.find({
            gmail: login.gmail
        })
        if(login.passWord === user[0].passWord){
            res.json({
                success: true,
                user
            })
        } else {
            res.json({
                success: false,
                message:"Password is Wrong",
                user
            })
        }
        
    } catch (error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}