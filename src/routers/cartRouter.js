const Router = require('express');
const { addCart } = require('../controllers/cartController');

const cartRouter = Router();
cartRouter.get('/addCart',addCart)
module.exports = cartRouter;