const asyncHandle = require('express-async-handler')
const CartModel = require('../models/cartModel')

const addCart = asyncHandle(async (req, res) => {
    const { email, imagelink_square, name, roasted, size, price, quantity } = req.body;

    // Tìm giỏ hàng của người dùng theo email
    const cart = await CartModel.findOne({ email });

    if (!cart) {
        // Nếu chưa có giỏ hàng, tạo mới và thêm sản phẩm vào
        const newCart = new CartModel({
            email,
            items: [{ imagelink_square, name, roasted, size, price, quantity }],
        });

        await newCart.save();
        return res.status(201).json(newCart);
    } else {
        // Nếu đã có giỏ hàng
        const existingItemIndex = cart.items.findIndex(item => item.id === req.body.id);

        if (existingItemIndex !== -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
            cart.items[existingItemIndex].quantity += 1;
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
            cart.items.push({ imagelink_square, name, roasted, size, price, quantity });
        }

        // Lưu giỏ hàng mới vào cơ sở dữ liệu
        await cart.save();

        return res.status(200).json(cart);
    }
});
module.exports = {
    addCart
}