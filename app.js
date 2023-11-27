/* eslint-disable linebreak-style */
/* eslint-disable no-case-declarations */
/* eslint-disable linebreak-style */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-fallthrough */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line linebreak-style
/* eslint-disable block-scoped-var */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable default-case */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const createBot = require('whatsapp-cloud-api');
const express = require('express');

const app = express();
const PORT = 9031;
const Users = require('./models/users');
const db = require('./db');
const user_prompts = require('./routes/user_prompts');
// Other imports...

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Transaction = require('./models/transactions');
const regularPrices = require('./models/regular_prices');
const businessPrices = require('./models/business_prices');

const utils = require('./utils');
const logger = require('./logger');
// Initialize your database connection and other necessary setup...

db.connect();
const from = '138691232664340';
const token = process.env.ACCESS_TOKEN;
const webhookVerifyToken = 'hellogloriathisis';
const bot = createBot.createBot(from, token);

const userStates = new Map();
let whatsappUserNumber;
let userState;

(async () => {
  try {
    await bot.startExpressServer({
      webhookVerifyToken,
      port: 3000,
      webhookPath: '/custom/webhook',
    });

    const getAllRegularUserPrices = await regularPrices.find();
    const getAllBusinessUserPrices = await businessPrices.find();

    const mtn_250mb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_250mb').priceValue;
    const mtn_500mb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_500mb').priceValue;
    const mtn_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_1gb').priceValue;
    const mtn_2gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_2gb').priceValue;
    const mtn_3gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_3gb').priceValue;
    const mtn_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_5gb').priceValue;
    const mtn_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_10gb').priceValue;
    const mtn_15gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_15gb').priceValue;

    const mtn_250mb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_250mb').priceValue;
    const mtn_500mb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_500mb_CG').priceValue;
    const mtn_1gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_1gb_CG').priceValue;
    const mtn_2gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_2gb_CG').priceValue;
    const mtn_3gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_3gb_CG').priceValue;
    const mtn_5gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_5gb_CG').priceValue;
    const mtn_10gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_10gb_CG').priceValue;
    const mtn_15gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_15gb_CG').priceValue;

    const mtn_500mb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_500mb_CG').priceValue;
    const mtn_1gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_1gb_CG').priceValue;
    const mtn_2gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_2gb_CG').priceValue;
    const mtn_3gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_3gb_CG').priceValue;
    const mtn_5gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_5gb_CG').priceValue;
    const mtn_10gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_10gb_CG').priceValue;
    const mtn_15gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_15gb_CG').priceValue;

    const nin_mobile_500mb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_500mb').priceValue;
    const nin_mobile_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_1gb').priceValue;
    const nin_mobile_2gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_2gb').priceValue;
    const nin_mobile_3gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_3gb').priceValue;
    const nin_mobile_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_5gb').priceValue;
    const nin_mobile_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_10gb').priceValue;

    const glo_500mb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_500mb').priceValue;
    const glo_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_1gb').priceValue;
    const glo_2gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_2gb').priceValue;
    const glo_3gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_3gb').priceValue;
    const glo_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_5gb').priceValue;
    const glo_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_10gb').priceValue;

    // Fetch prices for Airtel plans
    const airtel_500mb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_500mb').priceValue;
    const airtel_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_500mb').priceValue;
    const airtel_300mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_300mb').priceValue;
    const airtel_300mb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_300mb').priceValue;
    const airtel_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_1gb').priceValue;
    const airtel_2gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_2gb').priceValue;
    const airtel_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_5gb').priceValue;
    const airtel_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_10gb').priceValue;
    const airtel_15gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_15gb').priceValue;

    // Fetch prices for MTN plans
    const mtn_250mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_250mb').priceValue;

    const mtn_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_500mb').priceValue;
    const mtn_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_1gb').priceValue;
    const mtn_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_2gb').priceValue;
    const mtn_3gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_3gb').priceValue;
    const mtn_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_5gb').priceValue;
    const mtn_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_10gb').priceValue;

    // Fetch prices for 9mobile plans
    const nin_mobile_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'nin_mobile_500mb').priceValue;
    const nin_mobile_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_1gb').priceValue;
    const nin_mobile_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_2gb').priceValue;
    const nin_mobile_3gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_3gb').priceValue;
    const nin_mobile_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_5gb').priceValue;
    const nin_mobile_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_10gb').priceValue;

    // Fetch prices for Glo plans

    const glo_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_500mb').priceValue;
    const glo_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_1gb').priceValue;
    const glo_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_2gb').priceValue;
    const glo_3gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_3gb').priceValue;
    const glo_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_5gb').priceValue;
    const glo_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_10gb').priceValue;

    const glo_200mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_200mb').priceValue;
    const glo_200mb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_200mb').priceValue;

    // Fetch prices for Airtel plans
    const airtel_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_1gb').priceValue;
    const airtel_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_2gb').priceValue;
    const airtel_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_5gb').priceValue;
    const airtel_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_10gb').priceValue;

    const airtel_11gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_11gb').priceValue;
    const airtel_11gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_11gb').priceValue;

    bot.on('text', async (msg) => {
      try {
        console.log('Hello');
        whatsappUserNumber = msg.from;
        let checkUserType;
        // Get the user's state from the global userStates map
        userState = userStates.get(whatsappUserNumber) || 'START';
        const userInput = (msg.data.text || '').toUpperCase();

        async function buyData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, message, network, type, userState, userStates, bot, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE, userInput, ROSSY_CG_DATA_ID, CLUBKONECT_CG_DATA_ID, PATOMOBILE_CG_DATA_ID, CG_DATA_PRICE, CG_DATA_AMOUNT) {
          const user = await Users.findOne({ phone: whatsappUserNumber });

          // Set the user's state to INPUT_PHONE_NO to await the phone number
          userState = 'INPUT_PHONE_NO';
          userStates.set(whatsappUserNumber, userState);
          await bot.sendText(whatsappUserNumber, 'Enter phone number to buy data, Enter it like this: 08166358607 or type Cancel to go back.');

          bot.on('message', async (msg) => {
            console.log(`${msg.from} said: ${msg.data.text}`);
            if (userInput.toUpperCase() === null) {
              await bot.sendText(whatsappUserNumber, 'Invalid message format, enter Cancel to go back to main menu');
            }
            if (msg.data.text.toUpperCase() === 'CANCEL') {
              console.log('Cancel');
              userInput = '';
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
              return;
            }
            if (msg.data.text.toUpperCase() !== 'CANCEL' && userState !== 'START') {
              // Handle the user's phone number input and data purchase logic here
              const getPhoneNo = msg.data.text;
              const result = await utils.validateUserPhoneNo(getPhoneNo, CLUBKONECT_MOBILE_NETWORK_CODE);
              // if (checkPhoneNumNetwork.status === 'false') {
              //   await bot.sendText(whatsappUserNumber, checkPhoneNumNetwork.message);
              //   console.log('hello');
              // } else if (checkPhoneNumNetwork.status === 'true') {
              if (result.status === true) {
                // Validate the phone number and process data purchase

                const buyDataResponse = await utils.fetchData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, getPhoneNo, network, type, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE);
                await bot.sendText(whatsappUserNumber, buyDataResponse);

                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
                a --> Fund wallet
                b --> Buy data
                c --> Check wallet balance
                d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
              } else {
                // Handle invalid phone number input
                await bot.sendText(whatsappUserNumber, result.message);
              }
            }
          });
          // Listen for the user's response
        }

        if (userInput.toUpperCase() === 'START') {
          userState = 'START';
          userStates.set(whatsappUserNumber, userState);
        }

        switch (userState) {
          case 'BUYING_CG_DATA':
            console.log('Buying CG data....');
            break;
          case 'START':

            if (userInput.toUpperCase() === 'A') {
              userState = 'FUND_WALLET';
              userStates.set(whatsappUserNumber, userState);
              console.log(userState);
              await bot.sendText(msg.from, 'Enter the amount you would like to use to fund your wallet, please note that funding requires N50: ⬇️ \n\n To go back, enter Cancel ');
            } else if (userInput.toUpperCase() === 'B') {
              userState = 'CHOOSE_NETWORK';
              console.log(userState);
              userStates.set(whatsappUserNumber, userState);
              await bot.sendText(msg.from, 'Which network would you like to purchase your data in?\nPress a for MTN\nPress b for Airtel\nPress c for Glo\nPress d for 9mobile or type Cancel to go back');
            } else if (userInput.toUpperCase() === 'C') {
              const user = await Users.findOne({ phone: whatsappUserNumber });
              await bot.sendText(msg.from, `You have NGN ${user.walletBalance}  in your wallet balance.\n\n Enter 'Cancel' to go back to the main menu!`);
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
            } else if (userInput.toUpperCase() === 'D') {
              await bot.sendText(msg.from, 'Click this link to speak with Expenditures Buddy!\n\n⬇️ https://wa.link/y3k6lb \n or type Cancel to return back to the main menu!');
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
            } else if (userInput.toUpperCase() === 'E') {
              userState = 'INPUT_DATA_2_ANOTHER_USER';
              userStates.set(whatsappUserNumber, userState);
            } else {
              console.log(userState);
              await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
            a --> Fund wallet
            b --> Buy data
            c --> Check wallet balance
            d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
            }
            break;
          case 'CHOOSE_AIRTEL_PLAN':
            switch (userInput.toUpperCase()) {
              case 'A':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'airtel_300mb_7days', airtel_300mb_business, 103220, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 277, 300, '04', userInput, 277, 300, 103220, airtel_300mb_business, '300MB');
                }
                return await buyData(whatsappUserNumber, 'airtel_300mb_7days', airtel_300mb, 103220, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 277, 300, '04', userInput, 277, 300, 103220, airtel_300mb_business, '300MB');
                break;
              case 'B':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'airtel_500mb_30days', airtel_500mb_business, 103220, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 244, 500, '04', userInput, 244, 500, 103220, airtel_500mb_business, '500mb');
                }

                return await buyData(whatsappUserNumber, 'airtel_500mb_30days', airtel_500mb, 103220, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 244, 500, '04', userInput, 244, 500, 103220, airtel_500mb_business, '500mb');
                break;
              case 'C':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'airtel_1gb_30days', airtel_1gb_business, 100, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 236, 1000, '04', userInput, 236, 1000, 100, airtel_1gb_business, '1gb');
                }
                return await buyData(whatsappUserNumber, 'airtel_1gb_30days', airtel_1gb, 100, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 236, 1000, '04', userInput, 236, 1000, 100, airtel_1gb_business, '1gb');

                break;
              case 'D':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'airtel_2gb_30days', airtel_2gb_business, 101, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 237, 2000, '04', userInput, 237, 2000, 101, airtel_2gb_business, '2gb');
                }
                return await buyData(whatsappUserNumber, 'airtel_2gb_30days', airtel_2gb, 101, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 237, 2000, '04', userInput, 237, 2000, 101, airtel_2gb_business, '2gb');

                break;
              case 'E':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'airtel_5gb_30days', airtel_5gb_business, 102, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 238, 5000, '04', userInput, 238, 5000, 102, airtel_5gb_business, '5gb');
                }
                return await buyData(whatsappUserNumber, 'airtel_5gb_30days', airtel_5gb, 102, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 238, 5000, '04', userInput, 238, 5000, 102, airtel_5gb_business, '5gb');

                break;
              case 'F':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'airtel_10gb_30days', airtel_10gb_business, 103, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 239, 1000, '04', userInput, 239, 10000, 10300, airtel_10gb_business, '10GB');
                }
                return await buyData(whatsappUserNumber, 'airtel_10gb_30days', airtel_10gb, 103, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 239, 1000, '04', userInput, 239, 10000, 10300, airtel_10gb, '10GB');
                break;
              case 'CANCEL':
                userState = 'START';
                userStates.set(whatsappUserNumber, userState);
                await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
              a --> Fund wallet
              b --> Buy data
              c --> Check wallet balance
              d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
                break;
              default:
                if (!(userState === 'FUND_WALLET' || userState === 'INPUT_PHONE_NO')) {
                  console.log(userState);
                  await bot.sendText(msg.from, 'Invalid option. Please enter a, b, c, d, e, f, or g or type Cancel to go back');
                }
                break;
            }
            break;
          case 'CHOOSE_GLO_PLAN':
            switch (userInput.toUpperCase()) {
              case 'A':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'glo_cg_200mb_30days', glo_200mb_business, 120000, msg, 'glo', 'corporate', userState, userStates, bot, 2, 278, 500, '02', userInput, 276, 500, 122, glo_200mb_business, '200 MB');
                }
                return await buyData(whatsappUserNumber, 'glo_cg_500mb_30days', glo_500mb_business, 122, msg, 'glo', 'corporate', userState, userStates, bot, 2, 276, 500, '02', userInput, 276, 500, 122, glo_500mb, '500MB');
                break;
              case 'B':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'glo_cg_500mb_30days', glo_500mb_business, 122, msg, 'glo', 'corporate', userState, userStates, bot, 2, 276, 500, '02', userInput, 276, 500, 122, glo_500mb_business, '500 MB');
                }
                return await buyData(whatsappUserNumber, 'glo_cg_500mb_30days', glo_500mb, 122, msg, 'glo', 'corporate', userState, userStates, bot, 2, 276, 500, '02', userInput, 276, 500, 122, glo_500mb, '500MB');
                break;
              case 'C':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'glo_cg_1gb_30days', glo_1gb_business, 123, msg, 'glo', 'corporate', userState, userStates, bot, 2, 271, 1000, '02', userInput, 194, 1000, 123, glo_1gb_business, '1gb');
                }
                return await buyData(whatsappUserNumber, 'glo_cg_1gb_30days', glo_1gb, 123, 'glo', msg, 'corporate', userState, userStates, bot, 2, 271, 1000, '02', userInput, 194, 1000, 123, glo_1gb, '1gb');
                break;
              case 'D':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'glo_cg_2gb_30days', glo_2gb_business, 124, 'glo', msg, 'corporate', userState, userStates, bot, 2, 272, 2000, '02', userInput, 272, 2000, 124, glo_2gb_business, '2gb');
                }
                return await buyData(whatsappUserNumber, 'glo_cg_2gb_30days', glo_2gb, 124, 'glo', msg, 'corporate', userState, userStates, bot, 2, 272, 2000, '02', userInput, 272, 2000, 124, glo_2gb, '2gb');
                break;
              case 'E':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'glo_cg_3gb_30days', glo_3gb_business, 125, 'glo', msg, 'corporate', userState, userStates, bot, 2, 273, 3000, '02', userInput, 195, 3000, 125, glo_3gb_business, '3gb');
                }
                return await buyData(whatsappUserNumber, 'glo_cg_3gb_30days', glo_3gb, 125, 'glo', msg, 'corporate', userState, userStates, bot, 2, 273, 3000, '02', userInput, 195, 3000, 125, glo_3gb, '3gb');
                break;
              case 'F':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'glo_cg_5gb_30days', glo_5gb_business, 126, 'glo', msg, 'corporate', userState, userStates, bot, 2, 274, 5000, '02', userInput, 274, 5800.01, 126, glo_5gb_business, '5.8gb');
                }
                return await buyData(whatsappUserNumber, 'glo_cg_5gb_30days', glo_5gb, 126, 'glo', msg, 'corporate', userState, userStates, bot, 2, 274, 5000, '02', userInput, 274, 5000, 126, glo_5gb, '5.8gb');

                break;
              case 'G':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'glo_cg_10gb_30days', glo_10gb_business, 127, 'glo', msg, 'corporate', userState, userStates, bot, 2, 275, 10000, '02', userInput, 275, 10000, 127, glo_10gb_business, '10gb');
                }
                return await buyData(whatsappUserNumber, 'glo_cg_10gb_30days', glo_10gb, 127, 'glo', msg, 'corporate', userState, userStates, bot, 2, 275, 10000, '02', userInput, 275, 10000, 127, glo_10gb, '10gb');
                break;
              case 'CANCEL':
                userState = 'START';
                userStates.set(whatsappUserNumber, userState);
                await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
                a --> Fund wallet
                b --> Buy data
                c --> Check wallet balance
                d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
                break;
              default:
                if (!(userState === 'FUND_WALLET' || userState === 'INPUT_PHONE_NO')) {
                  console.log(userState);
                  await bot.sendText(msg.from, 'Invalid option. Please enter a, b, c, d, e, f, or g or type Cancel to go back');
                }
                break;
            }
            break;
          case 'CHECK_WALLET_BALANCE':
            checkUserType = await Users.findOne({ phone: whatsappUserNumber });
            await bot.sendText(msg.from, `You have NGN ${checkUserType.walletBalance}  in your wallet balance.\n\n`);
            userState = 'START'; // Return to the main menu4
            userStates.set(whatsappUserNumber, userState);
            await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
              a --> Fund wallet
              b --> Buy data
              c --> Check wallet balance
              d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
            break;
          case 'CHOOSE_NETWORK':
            checkUserType = await Users.findOne({ phone: whatsappUserNumber });
            if (userInput.toUpperCase() === 'A') {
              checkUserType = await Users.findOne({ phone: whatsappUserNumber });
              if (checkUserType.userType === 'business') {
                await bot.sendText(
                  msg.from,
                  '\t \t \t MTN Data Plans \n\n'
                  + `a. 250mb --> N${mtn_250mb_business} \n`
                        + `b. 500mb --> N${mtn_500mb_business} \n`
                        + `c. 1gb --> N${mtn_1gb_business} \n`
                        + `d. 2gb --> N${mtn_2gb_business} \n`
                        + `e. 3gb --> N${mtn_3gb_business} \n`
                        + `f. 5gb --> N${mtn_5gb_business} \n`
                        + `g. 10gb --> N${mtn_10gb_business} \n`
                        + 'Enter in either a, b, c, d, e, f, or g for the following plans or type \'Cancel\' to go back.',
                );
              } else {
                await bot.sendText(
                  msg.from,
                  '\t \t \t MTN Data Plans \n\n'
                  + `a. 250mb --> N${mtn_250mb} \n`
                  + `b. 500mb --> N${mtn_500mb} \n`
                  + `c. 1gb --> N${mtn_1gb} \n`
                  + `d. 2gb --> N${mtn_2gb} \n`
                  + `e. 3gb --> N${mtn_3gb} \n`
                  + `f. 5gb --> N${mtn_5gb} \n`
                  + `g. 10gb --> N${mtn_10gb} \n`
                  + 'Enter in either a, b, c, d, e, f, or g for the following plans or type \'Cancel\' to go back.',
                );
              }
              userState = 'CHOOSE_MTN_PLAN';
              userStates.set(whatsappUserNumber, userState);
            } else if (userInput.toUpperCase() === 'B') {
              if (checkUserType.userType === 'business') {
                // Airtel Plans here!
                await bot.sendText(msg.from, `
              \t \t \t Airtel Data Plans \n\n
              a. 300MB --> N${airtel_300mb_business} \n
              b. 500MB --> N${airtel_500mb_business} \n
              c. 1GB --> N${airtel_1gb_business} \n
              d. 2GB --> N${airtel_2gb_business} \n
              e. 5GB --> N${airtel_5gb_business} \n
              f. 10GB --> N${airtel_10gb_business} \n
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
              } else {
                await bot.sendText(msg.from, `
              \t \t \t Airtel Data Plans \n\n
              a. 300 MB --> N${airtel_300mb} \n
              b. 500 MB --> N${airtel_500mb} \n
              c. 1GB --> N${airtel_1gb} \n
              d. 2GB --> N${airtel_2gb} \n
              e. 5GB --> N${airtel_5gb} \n
              f. 10GB --> N${airtel_10gb} \n
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
              }
              userState = 'CHOOSE_AIRTEL_PLAN';
              userStates.set(whatsappUserNumber, userState);
            } else if (userInput.toUpperCase() === 'C') {
              userState = 'CHOOSE_GLO_PLAN';
              userStates.set(whatsappUserNumber, userState);

              if (checkUserType.userType === 'business') {
                await bot.sendText(msg.from, ` \t \t \t GLO Data Plans \n
              a. GLO 200MB --> NGN ${glo_200mb_business} \n
              b. GLO 500MB --> NGN ${glo_500mb_business} \n
              c. GLO 1GB --> NGN ${glo_1gb_business} \n
              d. GLO 2GB --> NGN ${glo_2gb_business} \n
              e. GLO 3GB --> NGN ${glo_3gb_business} \n
              f. GLO 5GB --> NGN ${glo_5gb_business} \n
              g. GLO 10GB --> NGN ${glo_10gb_business} \n
                        
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
              } else {
                await bot.sendText(msg.from, ` \t \t \t GLO Data Plans \n
              a. GLO 200MB --> NGN ${glo_200mb} \n
              b. GLO 500MB --> NGN ${glo_500mb} \n
              c. GLO 1GB --> NGN ${glo_1gb} \n
              d. GLO 2GB --> NGN ${glo_2gb} \n
              e. GLO 3GB --> NGN ${glo_3gb} \n
              f. GLO 5GB --> NGN ${glo_5gb} \n
              . GLO 10GB --> NGN ${glo_10gb} \n
                        
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
              }
            } else if (userInput.toUpperCase() === 'D') {
              userState = 'CHOOSE_9MOBILE_PLAN';
              userStates.set(whatsappUserNumber, userState);

              if (checkUserType.userType === 'business') {
                await bot.sendText(msg.from, ` \t \t \t 9mobile Data Plans \n
                a. 9mobile 500MB -> NGN ${nin_mobile_500mb_business} \n
                b. 9mobile 1GB -> NGN ${nin_mobile_1gb_business} \n
                c. 9mobile 2GB -> NGN ${nin_mobile_2gb_business} \n
                d. 9mobile 3GB -> NGN ${nin_mobile_3gb_business} \n
                e. 9mobile 5GB -> NGN ${nin_mobile_5gb_business} \n
                f. 9mobile 10GB -> NGN ${nin_mobile_10gb_business} \n
                          
                Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
              `);
              } else {
                await bot.sendText(msg.from, ` \t \t \t 9mobile Data Plans \n
                a. 9mobile 1GB -> NGN ${nin_mobile_500mb} \n
                b. 9mobile 1GB -> NGN ${nin_mobile_1gb} \n
                c. 9mobile 2GB -> NGN ${nin_mobile_2gb} \n
                d. 9mobile 3GB -> NGN ${nin_mobile_3gb} \n
                e. 9mobile 5GB -> NGN ${nin_mobile_5gb} \n
                f. 9mobile 10GB -> NGN ${nin_mobile_10gb} \n
                          
                Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
              `);
              }
            } else if (userInput.toUpperCase() === 'CANCEL') {
              await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
              a --> Fund wallet
              b --> Buy data
              c --> Check wallet balance
              d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
              userState = 'START';
              userStates.set(whatsappUserNumber, userState);
            }
            break;
          case 'CANCEL':
            userState = 'START';
            userStates.set(whatsappUserNumber, userState);
            await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
            a --> Fund wallet
            b --> Buy data
            c --> Check wallet balance
            d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
            break;
          case 'CHOOSE_MTN_PLAN':
            switch (userInput.toUpperCase()) {
              case 'A':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                userStates.set(whatsappUserNumber, userState);
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_250mb', mtn_250mb_business, 20000, msg, 'mtn', 'sme', userState, userStates, bot, 1, 216, 1000.0, '01', userInput, 216, 1000.00, 200000, mtn_250mb_business, '250 MB');
                }
                return await buyData(whatsappUserNumber, 'data_share_250mb', mtn_250mb, 20000, msg, 'mtn', 'sme', userState, userStates, bot, 1, 216, 1000.0, '01', userInput, 216, 1000.00, 200000, mtn_250mb);
                break;
              case 'B':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                userStates.set(whatsappUserNumber, userState);
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_500mb', mtn_500mb_business, 10, msg, 'mtn', 'sme', userState, userStates, bot, 1, 264, 500.0, '01', userInput, 212, 500.00, 10, mtn_500mb_CG_business, '500 MB');
                }

                return await buyData(whatsappUserNumber, 'data_share_500mb', mtn_500mb, 1, msg, 'mtn', 'sme', userState, userStates, bot, 1, 264, 500.0, '01', userInput, 212, 500.00, 10, mtn_500mb_CG);

                break;
              case 'C':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_1gb', mtn_1gb_business, 2, msg, 'mtn', 'sme', userState, userStates, bot, 1, 7, 1000.0, '01', userInput, 213, 1000.00, 2, mtn_1gb_CG_business, '1GB');
                }
                return await buyData(whatsappUserNumber, 'data_share_1gb', mtn_1gb, 2, msg, 'mtn', 'sme', userState, userStates, bot, 1, 7, 1000.0, '01', userInput, 213, 1000.00, 2, mtn_1gb_CG);

                break;
              case 'D':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_2gb', mtn_2gb_business, 3, msg, 'mtn', 'sme', userState, userStates, bot, 1, 8, 2000.0, '01', userInput, 231, 2000.00, 3, mtn_2gb_CG_business, '2GB');
                }
                return await buyData(whatsappUserNumber, 'data_share_2gb', mtn_2gb, 3, msg, 'mtn', 'sme', userState, userStates, bot, 1, 8, 2000.0, '01', userInput, 231, 2000.00, 3, mtn_2gb_CG);

                break;
              case 'E':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_3gb', mtn_3gb_business, 4, msg, 'mtn', 'sme', userState, userStates, bot, 1, 44, 3000.0, '01', userInput, 232, 3000.00, 4, mtn_3gb_CG_business, '3 GB');
                }
                return await buyData(whatsappUserNumber, 'data_share_3gb', mtn_3gb, 4, msg, 'mtn', 'sme', userState, userStates, bot, 1, 44, 3000.0, '01', userInput, 232, 3000.00, 4, mtn_3gb_CG);

                break;
              case 'F':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_5gb', mtn_5gb_business, 5, msg, 'mtn', 'sme', userState, userStates, bot, 1, 11, 5000.0, '01', userInput, 233, 5000.00, 5, mtn_5gb_CG_business, '5 GB');
                }
                return await buyData(whatsappUserNumber, 'data_share_5gb', mtn_5gb, 5, msg, 'mtn', 'sme', userState, userStates, bot, 1, 11, 5000.0, '01', userInput, 233, 5000.00, 5, mtn_5gb_CG);

                break;
              case 'G':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_10gb', mtn_10gb_business, 6, msg, 'mtn', 'sme', userState, userStates, bot, 1, 43, 10000.0, '01', userInput, 266, 10000.00, 6, mtn_10gb_CG_business, '10 GB');
                }
                return await buyData(whatsappUserNumber, 'data_share_10gb', mtn_10gb, 6, msg, 'mtn', 'sme', userState, userStates, bot, 1, 265, 10000.0, '01', userInput, 266, 10000.00, 6, mtn_10gb_CG);

                break;
              case 'CANCEL':
                userState = 'START';
                userStates.set(whatsappUserNumber, userState);
                await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
                a --> Fund wallet
                b --> Buy data
                c --> Check wallet balance
                d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
                break;
              default:
                if (!(userState === 'FUND_WALLET' || userState === 'INPUT_PHONE_NO')) {
                  console.log(userState);
                  await bot.sendText(msg.from, 'Invalid option. Please enter a, b, c, d, e, f, or g or type Cancel to go back');
                }
                break;
            }
            break;
          case 'A':
            if (userInput === 'A') {
              // Update the user's state to 'FUND_WALLET' and send a message
              userState = 'FUND_WALLET';
              userStates.set(whatsappUserNumber, userState);
              await bot.sendText(msg.from, 'Enter the amount to fund your wallet.');
            }
            break;
          case 'INPUT_PHONE_NO':
            console.log('Input phone number case!...');
            break;
          case 'CHOOSE_9MOBILE_PLAN':
            switch (userInput.toUpperCase()) {
              case 'A':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, '9mobile_sme_500mb', nin_mobile_500mb_business, 230000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 279, 500, '03', userInput, 279, 500, 200000, nin_mobile_500mb_business, '500 MB');
                }
                return await buyData(whatsappUserNumber, '9mobile_sme_500mb', nin_mobile_500mb_business, 23000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 279, 500, '03', userInput, 279, 500, 200000, nin_mobile_500mb_business, '500 MB');
                break;
              case 'B':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, '9mobile_sme_1gb', nin_mobile_1gb_business, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 280, 1000, '03', userInput, 280, 1000, 10000, nin_mobile_1gb_business, '1 GB');
                }
                return await buyData(whatsappUserNumber, '9mobile_sme_1gb', nin_mobile_1gb, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 280, 1000, '03', userInput, 280, 1000, 10000, nin_mobile_1gb, '1 GB');
                break;
              case 'C':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, '9mobile_sme_2gb', nin_mobile_2gb_business, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 282, 2000, '03', userInput, 282, 2000, 20000, nin_mobile_2gb_business, '2 GB');
                }
                return await buyData(whatsappUserNumber, '9mobile_sme_2gb', nin_mobile_2gb, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 282, 2000, '03', userInput, 282, 2000, 20000, nin_mobile_2gb, '2 GB');
                break;
              case 'D':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, '9mobile_sme_3gb', nin_mobile_3gb_business, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 284, 3000, '03', userInput, 284, 3000, 30000, nin_mobile_3gb_business, '3 GB');
                }
                return await buyData(whatsappUserNumber, '9mobile_sme_3gb', nin_mobile_3gb, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 284, 3000, '03', userInput, 284, 3000, 30000, nin_mobile_3gb, '3 GB');
                break;
              case 'E':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, '9mobile_sme_5gb', nin_mobile_5gb_business, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 224, 5000, '03', userInput, 224, 5000, 50000, nin_mobile_5gb_business, '5 GB');
                }
                return await buyData(whatsappUserNumber, '9mobile_sme_5gb', nin_mobile_5gb, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 224, 5000, '03', userInput, 224, 5000, 50000, nin_mobile_5gb, '5 GB');
                break;
              case 'F':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, '9mobile_sme_10gb', nin_mobile_10gb_business, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 225, 10000, '03', userInput, 225, 10000, 50000, nin_mobile_10gb_business, '10 GB');
                }
                return await buyData(whatsappUserNumber, '9mobile_sme_10gb', nin_mobile_10gb_business, 260000, msg, '9mobile', 'corporate', userState, userStates, bot, 3, 225, 10000, '03', userInput, 225, 10000, 50000, nin_mobile_10gb_business, '10 GB');
                break;
              case 'CANCEL':
                userState = 'START';
                userStates.set(whatsappUserNumber, userState);
                await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
                a --> Fund wallet
                b --> Buy data
                c --> Check wallet balance
                d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
                break;
              default:
                if (!(userState === 'FUND_WALLET' || userState === 'INPUT_PHONE_NO')) {
                  console.log(userState);
                  await bot.sendText(msg.from, 'Invalid option. Please enter a, b, c, d, e, f, or g or type Cancel to go back');
                }
                break;
            }
          case 'FUND_WALLET':
            const amount = parseFloat(userInput);
            if ((Number.isNaN(amount)) === false) {
              if ((amount < 100)) {
                await bot.sendText(whatsappUserNumber, 'Sorry, funding almost is too low. Amount must be more than N 100. Please input to try again! \nTo go back, enter Cancel');
              } else {
                await bot.sendText(whatsappUserNumber, `You can make payment using the link be, no signup needed. Please also take note that funding requires N50 ⬇️\n\n  You are paying NGN ${amount} and will receive NGN ${amount - 50} in your wallet balance ⬇️ \n\n${await user_prompts.fundingWallet(amount, `${user_prompts.generateRandomEmail()}`, whatsappUserNumber, msg.from)}\n\n To go back to the main menu --> Simply enter Cancel`);
                // Clear the user's state
              }
            } else if (userInput.toUpperCase() === 'CANCEL') {
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
              await bot.sendText(whatsappUserNumber, 'You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships');
            } else {
              await bot.sendText(whatsappUserNumber, "Enter a valid amount, e.g., 10000 or type 'Cancel' to go back");
            }
            break;
        }
      } catch (error) {
        console.error(error);
        logger.error(error);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
)();

app.post('/my-webhook', async (req, res) => {
  try {
    console.log('Visited!');
    const { body } = req;
    const customer_phone_num = body.data.metadata.phone_no;
    const { chatId } = body.data.metadata;
    console.log(req.body);
    // paystack writes in kobo
    const nairaAmount = body.data.amount / 100;
    console.log(`nairaAmount is ${nairaAmount}`);
    if (body.event === 'charge.success') {
      const user = await Users.findOne({ phone: customer_phone_num });
      const { walletBalance } = user;
      const verifyTransactionStatus = await user_prompts.verifyTransaction(body.data.reference);
      console.log(verifyTransactionStatus);
      const TRANSACTION_CHARGE = 50;

      if (verifyTransactionStatus === true) {
        const updatedUser = await Users.findOneAndUpdate(
          { phone: customer_phone_num },
          { $inc: { walletBalance: nairaAmount - TRANSACTION_CHARGE } },
          { new: true },
        );

        const newTransaction = await Transaction.create({
          user_phoneNumber: `${customer_phone_num}`,
          amount: nairaAmount - TRANSACTION_CHARGE,
          txntype: 'credit',
          details: {
            desc: 'Funded Wallet ',
            amount: `${nairaAmount}`,
            ref_id: body.data.id,
          },
        });

        console.log(updatedUser);
        await bot.sendText(chatId, `You have successfully funded your wallet with ${nairaAmount}. Your wallet Balance is now ${updatedUser.walletBalance} NGN. \n You can proceed with your transactions. 🙌🥳✊🎉  \n 
        a --> Fund wallet \nx
          b --> Buy data \n
          c --> Check wallet balance \n d --> For inquiries/partnerships \n Please enter one of the following options, 1 or 2 or 7`);

        res.sendStatus(200);
        userState = 'START';
        userStates.set(customer_phone_num, userState);
      } else {
        res.send("There's something wrong with payment, sorry, try again! 😔");
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/hi', async (req, res) => {
  res.send('Hello!');
});
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
