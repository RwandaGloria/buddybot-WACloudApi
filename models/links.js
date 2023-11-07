//Mongodb to hold user detail and wallet balance. 

const mongoose = require('mongoose');
const { Schema } = mongoose;

const linksSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  linkRedirectTo: {
    type: String,
    required: true
  }, 
  createdAt: {
    type: Date,
    default: Date.now()
  }, 
  updatedAt:
   {
    type: Date,
    default: Date.now()
  }
});
const links = mongoose.model('links', linksSchema);
module.exports = links
