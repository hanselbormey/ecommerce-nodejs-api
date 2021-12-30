const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Decimal128
    },
    category: String,
    image: String
  });
  
  const Product = mongoose.model('Product', productSchema);

  module.exports.Product = Product;