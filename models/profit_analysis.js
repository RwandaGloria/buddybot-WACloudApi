// Mongodb to hold user detail and wallet balance.

const mongoose = require('mongoose');

const { Schema } = mongoose;

const BusinessPricesSchema = new Schema({
  totalAmountOfDataBought: {
    type: Number,
    required: true,
  },
  totalMTNDataBought: {
    type: Number,
    required: false,
  },
});
const businessPrices = mongoose.model('businessPrices', BusinessPricesSchema);
module.exports = businessPrices;
