const express = require('express')
const { getSingleUser } = require('../controllers/loginController')
const router = express.Router()

router.route('/login').post(getSingleUser)

module.exports = router