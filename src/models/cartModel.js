const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true

    },
    imagelink_square: {
        type: String,
    },
    name: {
        type: String,
    },
    roasted: {
        type: String,
    },
    size:{
        type:String,
    },
    price:{
        type:String
    },
    quantity:{
        type:String
    }
    
});

const CartModel = mongoose.model('cart', CartSchema);

module.exports = CartModel;