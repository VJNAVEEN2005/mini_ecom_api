const express = require('express')
const { AddToCart, GetCart, UpdateCart } = require('../controllers/cartController')
const router = express.Router()

router.route('/cart').post(AddToCart)
router.route('/getcart').post(GetCart)
router.route('/updatecart').get(UpdateCart)

module.exports = router