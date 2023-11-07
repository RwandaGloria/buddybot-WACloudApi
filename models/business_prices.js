//Mongodb to hold user detail and wallet balance. 

const mongoose = require('mongoose');
const { Schema } = mongoose;

const BusinessPricesSchema = new Schema({
  priceName: {
    type: String,
    required: true
  },
  priceValue: {
    type: mongoose.Schema.Types.Decimal128,
    required: false
  }
});
const businessPrices = mongoose.model('businessPrices', BusinessPricesSchema);
module.exports = businessPrices
