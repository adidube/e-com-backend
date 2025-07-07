const express =require('express')
const {
  checkout,
  verify,
  userOrder,
  allOrders,
}=require("../Controller/payment.js");

const Auth =require('../Middleware/Auth.js');

const router = express.Router();

// checkout
router.post('/checkout',checkout);

// verify-payment & save to db
router.post('/verify-payment',verify)

// user order
router.get("/userorder",Auth.Authenticated, userOrder);

// All order's
router.get("/orders", allOrders);




module.exports= router