const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    roasted: {
        type: String,
    },
    imagelink_square: {
        type: String,
    },
    imagelink_portrait: {
        type: String,
    },
    price:{
        type:String,
    },
    size:{
        type:String,
    },
    type:{
        type:String,
    }

    
});

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;