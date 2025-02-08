const express = require('express')
const { CreateUser } = require('../controllers/signupController')
const router = express.Router()

router.route('/signup').post(CreateUser)

module.exports = router