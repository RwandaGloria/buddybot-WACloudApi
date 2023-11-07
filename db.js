const mongoose = require('mongoose');
const logger = require("./logger");
require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.log({
        level: 'info', message: "Connected to MongoDB successfully" })
  } catch (err) {
    logger.log({level: "info", message: err.message })
    // logger.log("Failed")
    // logger.logger.info("Failed connection to MongoDB at " + Date.now + `\n Error details:  ${err}`)

  }}

  module.exports = { connect }