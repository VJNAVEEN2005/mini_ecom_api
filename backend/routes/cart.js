const express = require('express')
const { AddToCart, GetCart, UpdateCart, cartdata } = require('../controllers/cartController')
const router = express.Router()

router.route('/cart').post(AddToCart)
router.route('/getcart').post(GetCart)
router.route('/updatecart').post(UpdateCart)
router.route('/cartdata').post(cartdata)

module.exports = router