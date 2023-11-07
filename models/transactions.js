const mongoose = require('mongoose');
const { Schema } = mongoose;


const transactionSchema = new Schema({
    user_phoneNumber: {
        type: String
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    txntype : {
        type: String,
        required: true,
        enum: ['debit', 'credit']
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        required: false
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

const transaction = mongoose.model('transaction', transactionSchema);
module.exports = transaction;