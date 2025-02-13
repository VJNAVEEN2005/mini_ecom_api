const express = require('express')
const { AddToCart, GetCart } = require('../controllers/cartController')
const router = express.Router()

router.route('/cart').post(AddToCart)
router.route('/getcart').post(GetCart)

module.exports = router