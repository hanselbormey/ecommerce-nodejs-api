const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.Decimal128,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports.User = User;