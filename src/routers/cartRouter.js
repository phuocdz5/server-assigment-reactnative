const Router = require('express');
const { addCart } = require('../controllers/cartController');

const cartRouter = Router();
cartRouter.post('/addCart',addCart)
module.exports = cartRouter;