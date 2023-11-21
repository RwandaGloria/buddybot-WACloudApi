require('dotenv').config();
const axios = require('axios');
const logger = require('./logger');

const PAYSTACK_API_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API_BASE_URL = 'https://api.paystack.co';

async function getData(amount, email) {
  chat_id = '08166358607';
  phone_no = '08166358607';
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
    });
    console.log('Payment Link:', data.data.authorization_url);
    return data.data.authorization_url;
  }
}

getData(100, 'r@gmail.com');
