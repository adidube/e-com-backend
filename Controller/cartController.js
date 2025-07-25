const Cart = require("../Models/Cart.js");

// add To Cart
exports.addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;

  const userId = req.user;

// const userId = "6860bec0e7a984061c6d03ae";

  let cart = await Cart.findOne({ userId });



  if (!cart) {
    cart = new Cart({ userId, items: [] }); 
  }
   
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
 
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty; 
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();
  res.json({ message: "Items Added To Cart", cart });
};

// get User Cart
exports.userCart = async (req,res) =>{

  const userId = req.user;
  //  const userId = "6860bec0e7a984061c6d03ae";
   
   let cart = await Cart.findOne({userId});
   if(!cart) return res.json({messge:'Cart not found'})

    res.json({message:"user cart",cart})
}

// remove product from cart
exports.removeProductFromCart = async (req, res) => {

    const productId = req.params.productId;
  const userId = req.user;
  // const userId = "6860c279e7a984061c6d03b3";
  

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ messge: "Cart not found" });

  cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)

  await cart.save();

  res.json({ message: "product remove from cart"});
};


// clear cart
exports.clearCart = async (req, res) => {

  const userId = req.user;

  // const userId = "6860bec0e7a984061c6d03ae";

  let cart = await Cart.findOne({ userId });
  if (!cart){
    cart = new Cart({items:[]})
  } else{
    cart.items = [];
  }
  
  await cart.save();

  res.json({ message: " cart cleared"});
};


// decrease qty from Cart
exports.decreaseProudctQty = async (req, res) => {
  const { productId, qty} = req.body;

  const userId = req.user;
  // const userId ="6860bec0e7a984061c6d03ae";

  let cart = await Cart.findOne({ userId });
 
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    // return res.json({messge:'Cart not find'})
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex]

    if(item.qty > qty){
        const pricePerUnit = item.price/item.qty

        item.qty -= qty
        item.price -= pricePerUnit*qty
        
    }else{
        cart.items.splice(itemIndex,1)
    }

  } else {
    return res.json({messge:'invalid product Id'})
  } 

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};

// decrease qty from Cart
exports.deleteCart = async (req, res) => {
  

  const userId = req.user;
  // const userId ="6860c279e7a984061c6d03b3";

  let cart = await Cart.deleteOne({ userId });
 
 
    return res.json({messge:'Cart deleted',cart})
}

