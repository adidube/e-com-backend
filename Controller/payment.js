const Payment  =require("../Models/Payment.js");
const Razorpay = require("razorpay");




const razorpay = new Razorpay({
  key_id: "rzp_test_ZmOdOHM20BiohN",
  key_secret: "5lSK0Hm9NOJBHZM5rNEGga8z",
}); 

// checkout
exports.checkout = async (req, res) => {

    console.log("inside checkout")
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};


// verify , save to db
exports.verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

// user specificorder
exports.userOrder = async (req,res) =>{
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate :-1});
  res.json(orders)
}

// user specificorder
exports.allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.json(orders)
}