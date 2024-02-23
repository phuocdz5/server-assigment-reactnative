const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    size: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: '$', // Nếu có thể, bạn có thể đặt giá trị mặc định là '$' hoặc làm cho trường này không bắt buộc.
    },
  });
  
  const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    prices: {
      type: [PriceSchema],
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  });
  
  const ProductModel = mongoose.model('product', ProductSchema);
  
  module.exports = ProductModel;