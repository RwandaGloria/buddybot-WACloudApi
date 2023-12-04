/* eslint-disable linebreak-style */
// Mongodb to hold user detail and wallet balance.

const mongoose = require('mongoose');

const { Schema } = mongoose;

const linksSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  isUsedBy: {
    type: String,
    required: false,
  },
  isUsed: {
    type: String,
    required: true,
    default: false,
  },
  linkRedirectTo: {
    type: String,
    required: true,
  },
  linkDateExpiry: {
    type: Date,
    required: false,
  },
  linkUsedDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt:
   {
     type: Date,
     default: Date.now(),
   },
  isLinkExpired: {
    type: Boolean,
    default: false,
  },
  isLinkUsed: {
    type: Boolean,
    default: false,
  },
});
const links = mongoose.model('links', linksSchema);
module.exports = links;
