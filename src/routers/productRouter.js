const Router = require('express');
const { getAllProduct } = require('../controllers/productController');

const productRouter = Router();
productRouter.get('/getAllProduct',getAllProduct)
module.exports = productRouter;