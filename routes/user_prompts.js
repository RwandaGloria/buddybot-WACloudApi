/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
const axios = require('axios');
const logger = require('../logger');
require('dotenv').config();

const PAYSTACK_API_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API_BASE_URL = 'https://api.paystack.co';

function generateRandomEmail() {
  const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';

  const usernameLength = Math.floor(Math.random() * 6) + 5;
  for (let i = 0; i < usernameLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    email += allowedChars[randomIndex];
  }
  email += '@example.com'; // You can replace "example.com" with your desired domain
  return email;
}

// eslint-disable-next-line consistent-return
async function verifyTransaction(id) {
  try {
    const response = await axios.get(
      `${PAYSTACK_API_BASE_URL}/transaction/verify/${id}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(response.data.data.status);

    if (response.data.data.status === 'success') {
      return true;
    }

    logger.log({
      level: 'info',
      message: response.body,
    });
    return false;
  } catch (err) {
    logger.log({
      level: 'info',
      message: err,
    });
  }
}

async function fundingWallet(amount, email, phone_no, chat_id) {
  try {
    const response = await axios.post(
      `${PAYSTACK_API_BASE_URL}/transaction/initialize`,
      {
        amount: amount * 100,
        email,
        phone: phone_no,
        bearer: 'subaccount',
        metadata: {
          phone_no,
          chatId: chat_id,

        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const { data } = response;
    if (data.status && data.data.authorization_url) {
      logger.log({
        level: 'info',
        message: ' successfully!',
      }); console.log('Payment Link:', data.data.authorization_url);
      return data.data.authorization_url;
    }

    console.error('Error creating payment link:', data.data.message);
  } catch (error) {
    console.log(error.message);
    logger.log({
      level: 'error',
      message: error,
    });
    console.error('An error occurred:', error.message);
  }
}
module.exports = { fundingWallet, generateRandomEmail, verifyTransaction };
