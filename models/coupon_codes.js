/* eslint-disable linebreak-style */
// Mongodb to hold user detail and wallet balance.

const mongoose = require('mongoose');

const { Schema } = mongoose;

const CouponCodeSchema = new Schema({
  couponCode: {
    type: String,
    required: true,
  },
  senderPhoneNo: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
  },
  isUsed: {
    type: Boolean,
    required: true,
    default: false,
  },
  isExpired:
  {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  usedBy: {
    type: String,
    required: false,
    default: '',
  },
  link: {
    type: String,
    required: false,
    default: '',
  },
  dataAmount: {
    type: String,
    required: false,
    default: '',
  },
  network: {
    type: String,
    required: false,
    default: '',
  },
  isCouponUsed: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCouponExpired: {
    type: Boolean,
    required: true,
    default: false,
  },
  couponUsedDate: {
    type: Date,
    required: false,
  },
  couponExpiryDate: {
    type: Date,
    required: false,
  },
});
const couponCodes = mongoose.model('couponCodes', CouponCodeSchema);
module.exports = couponCodes;
