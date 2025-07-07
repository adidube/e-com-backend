const Products=require( "../Models/Product.js");

// add product
exports.addProduct = async (req,res) =>{
    const {title,description,price,category,qty,imgSrc} = req.body
    try {
        let product = await Products.create({
          title,
          description,
          price,
          category,
          qty,
          imgSrc,
        });
        res.json({status:"Success",message:'Product added successfully...!',product})
        
    } catch (error) {
        res.json(error.message)
    }
}

// get all products
exports.getProducts = async (req,res) =>{
    let products = await Products.find().sort({createdAt:-1})
    console.log("hi");
    res.json({status:'Success',totalProducts:products.length,message:'All products',products})
}


// find product by id
exports.getProductById = async (req, res) => {
    const id = req.params.id;
  let product = await Products.findById(id)
  if(!product) return res.json({status:"Failed",message:'Invalid Id'})
  res.json({status:"Success", message: "Specific product", product });
};

// update product by id
exports.updateProductById = async (req, res) => {
    const id = req.params.id;
  let product = await Products.findByIdAndUpdate(id,req.body,{new:true})
  if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Product has been updated", product });
};

// delete product by id
exports.deleteProductById = async (req, res) => {
    const id = req.params.id;
  let product = await Products.findByIdAndDelete(id)
  if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Product has been deleted", product });
}; 