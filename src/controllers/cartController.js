const addCart = async (req, res) => {
    const { email, imagelink_square, name, roasted, size, price, quantity } = req.body;

    // Get the user's cart (assuming there is a cart field in the user document)
    const userCart = await CartModel.findOne({ email });

    if (!userCart) {
        // If the user doesn't have a cart, create a new one
        const newCart = new CartModel({
            email,imagelink_square, name, roasted, size, price, quantity 
        });

        await newCart.save();
        return res.status(201).json(newCart);
    }

    // If the user already has a cart, check if the item is already in the cart
    const itemIndex = userCart.findIndex((item) => item.name === name && item.size === size);

    if (itemIndex !== -1) {
        // If the item is already in the cart, update the quantity
        userCart[itemIndex].quantity += quantity;
    } else {
        // If the item is not in the cart, add a new item
        userCart.push({ imagelink_square, name, roasted, size, price, quantity });
    }

    await userCart.save();
    return res.status(200).json(userCart);
};

module.exports = { addCart };
