//Mongodb to hold user detail and wallet balance. 

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  walletBalance: {
    type: Number,
    default: 0
  },
    userType: {
      type: String,
      enum: ['regular', 'business'],
      required: true
    }
  
});
const User = mongoose.model('User', userSchema);
module.exports = 
    User
