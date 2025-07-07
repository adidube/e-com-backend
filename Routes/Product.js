const express=require('express')
const productController=require('../Controller/productController.js');

const router = express.Router();

// add product
router.post('/add',productController.addProduct)

// get product
router.get('/all',productController.getProducts)

// get product by Id
router.get('/:id',productController.getProductById)

// update product by Id
router.put('/:id',productController.updateProductById)

// delete product by Id
router.delete('/:id',productController.deleteProductById)


module.exports= router;