const asyncHandle = require('express-async-handler')
const ProductModel = require('../models/productModel')

const getAllProduct = asyncHandle(async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({
            message: 'Products retrieved successfully',
            data: products,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
})
module.exports = {
    getAllProduct
}