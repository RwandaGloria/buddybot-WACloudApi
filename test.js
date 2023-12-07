const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();
const Queue = require('bull');
const { createClient } = require('redis');
const logger = require('../logger');

const { SMTP_GMAIL_USER, SMTP_GMAIL_PASS, SMTP_EMAIL_SENDER } = process.env;

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('ready', () => {
  console.log('Redis client is ready');

  // Use the ping command to check the connection
  client.ping((err, result) => {
    if (err) {
      console.error('Error pinging Redis:', err);
    } else {
      console.log('Ping result:', result);
    }

    // Close the connection after checking
    client.quit();
  });
});

const emailQueue = new Queue('emails');

// Set up queue processing logic outside the main function



// Wrap the main code in an async function for proper handling of asynchronous operations
(async () => {
  try {
    await main('Hello', 'Gloria its me', 'stephaniechatravan@gmail.com');
    // Add a delay or wait for the asynchronous operations to complete
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error) {
    console.error(error);
  } finally {
    // Close the Redis client and exit the program
    client.quit();
  }
})();
