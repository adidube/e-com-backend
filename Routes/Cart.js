const express=require('express')
const  Auth = require('../Middleware/Auth');

const {
  addToCart,
  clearCart,
  removeProductFromCart,
  userCart,
  decreaseProudctQty,
  deleteCart
} = require("../Controller/cartController.js");



const router = express.Router();

// add To cart
router.post('/add', Auth.Authenticated , addToCart)

// get User Cart
router.get("/user",Auth.Authenticated ,  userCart);

// remove product from cart
router.delete("/remove/:productId",Auth.Authenticated , removeProductFromCart);

// clear cart
router.delete("/clear",Auth.Authenticated , clearCart);

// // decrease items qty
router.post("/--qty",Auth.Authenticated ,decreaseProudctQty);

// delete cart
router.delete("/deleteCart",Auth.Authenticated ,deleteCart);


module.exports = router;