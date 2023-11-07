//Mongodb to hold user detail and wallet balance. 

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CouponCodeSchema = new Schema({
  couponCode: {
    type: String,
    required: true
  },
  senderPhoneNo: {
    type: String, 
    required: true, 
    required: true
  },
  dataAmount: {
    type: String, 
    required: true
  },
  expiryTime: {
    type: Date, 
    required: true,
    default: function() {
      // Calculate expiry time as 24 hours (86400 seconds) after createdAt
      return new Date(Date.now() + 86400 * 1000); // 86400 seconds * 1000 milliseconds
    }
  },
  isUsed: {
    type: Boolean,
    required: true, 
    default: false
  }, 
  isExpired: 
  {
    type:Boolean, 
    required: true, 
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
const couponCodes = mongoose.model('couponCodes', CouponCodeSchema);
module.exports = couponCodes
