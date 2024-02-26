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
            imagelink_square,
            name,
            roasted,
            price,
            size,
            quantity
        });

        await newCart.save();
        return res.status(201).json(newCart);
    } else {
        // Nếu đã có giỏ hàng
        const existingItemIndex = cart.findIndex(item => item.name === req.body.name);

        if (existingItemIndex !== -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
            cart[existingItemIndex].quantity += 1;
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
            cart.push({ imagelink_square, name, roasted, size, price, quantity });
        }

        // Lưu giỏ hàng mới vào cơ sở dữ liệu
        await cart.save();

        return res.status(200).json(cart);
    }
});
module.exports = {
    addCart
}