/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
// bottleneck.js
const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 1, // Adjust as needed
  minTime: 1000, // Minimum time in milliseconds between each email
});

module.exports = limiter;
