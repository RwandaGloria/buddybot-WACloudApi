const createBot = require('whatsapp-cloud-api');
const express = require('express');

const app = express();
const PORT = 9031;
const Users = require('./models/users');
const db = require('./db');

// Other imports...

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Transaction = require('./models/transactions');
const regularPrices = require('./models/regular_prices');
const businessPrices = require('./models/business_prices');

const utils = require('./utils');

// Initialize your database connection and other necessary setup...
(async () => {
  try {
    await db.connect();

    const from = '138691232664340';
    const token = process.env.ACCESS_TOKEN;
    const webhookVerifyToken = 'hellogloriathisis';

    const bot = createBot.createBot(from, token);

    await bot.startExpressServer({
      webhookVerifyToken,
      port: 3000,
      webhookPath: '/custom/webhook',
    });

    const userStates = new Map();
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

    const glo_200mb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_200mb_CG').priceValue;

    const glo_500mb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_500mb_CG').priceValue;
    const glo_1gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_1gb_CG').priceValue;
    const glo_2gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_2gb_CG').priceValue;
    const glo_3gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_3.9gb_CG').priceValue;
    const glo_10gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_10gb_CG').priceValue;

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
    const airtel_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_1gb').priceValue;
    const airtel_2gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_2gb').priceValue;
    const airtel_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_5gb').priceValue;
    const airtel_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_10gb').priceValue;
    const airtel_15gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_15gb').priceValue;

    const airtel_300mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_300mb').priceValue;
    const airtel_300mb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_300mb').priceValue;

    const airtel_500mb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_500mb').priceValue;
    const airtel_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_500mb').priceValue;

    // Fetch prices for MTN plans
    const mtn_250mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_250mb').priceValue;

    const mtn_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_500mb').priceValue;
    const mtn_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_1gb').priceValue;
    const mtn_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_2gb').priceValue;
    const mtn_3gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_3gb').priceValue;
    const mtn_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_5gb').priceValue;
    const mtn_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_10gb').priceValue;

    // Fetch prices for 9mobile plans
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

    // Fetch prices for Airtel plans
    const airtel_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_1gb').priceValue;
    const airtel_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_2gb').priceValue;
    const airtel_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_5gb').priceValue;
    const airtel_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_10gb').priceValue;

    bot.on('text', async (msg) => {
      try {
        const whatsappUserNumber = msg.from;
        // Get the user's state from the global userStates map
        let userState = userStates.get(whatsappUserNumber) || 'START';
        const userInput = (msg.data.text || '').toUpperCase();

        async function buyData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, network, type, userState, userStates, bot, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE, userInput, ROSSY_CG_DATA_ID, CLUBKONECT_CG_DATA_ID, PATOMOBILE_CG_DATA_ID, CG_DATA_PRICE, CG_DATA_AMOUNT) {
          const user = await Users.findOne({ phone: whatsappUserNumber });

          // Set the user's state to INPUT_PHONE_NO to await the phone number
          userState = 'INPUT_PHONE_NO';
          userStates.set(whatsappUserNumber, userState);
          await bot.sendText(whatsappUserNumber, "Enter phone number to buy data, Enter it like this: 08166358607 or type 'Cancel' to go back.");

          bot.on('message', async (msg) => {
            console.log(userInput);
            if (msg.data.text.toUpperCase() === 'CANCEL') {
              userInput = '';
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
              return;
            }
            if (userInput.toUpperCase() !== 'CANCEL' && userState !== 'START') {
              // Handle the user's phone number input and data purchase logic here
              const getPhoneNo = msg.data.text;
              const result = await utils.validateUserPhoneNo(getPhoneNo);

              if (result) {
                // Validate the phone number and process data purchase
                const buyDataResponse = await utils.fetchData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, getPhoneNo, network, type, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE);

                await bot.sendText(whatsappUserNumber, buyDataResponse);
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
              } else {
                // Handle invalid phone number input
                await bot.sendText(whatsappUserNumber, "Invalid phone number format. Enter it like this: 08166358607 or type 'Cancel' to go back.");
              }
            }
          });
          // Listen for the user's response
        }

        if (msg.data.text.toUpperCase() === 'Y' && userState === 'BUYING_CG_DATA') {
          await utils.buyCGData(whatsappUserNumber, getPhoneNo, ROSSY_CG_DATA_ID, CLUBKONECT_MOBILE_NETWORK_CODE, CLUBKONECT_CG_DATA_ID, CG, CG_DATA_PRICE, CG_DATA_AMOUNT, userState, userStates);
        }

        if (userInput.toUpperCase() === 'START') {
          userState = 'START';
          userStates.set(whatsappUserNumber, userState);
        }

        switch (userState) {
          case 'BUYING_CG_DATA':
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
              await bot.sendText(msg.from, "Which network would you like to purchase your data in?\nPress a for MTN\nPress b for Airtel\nPress c for Glo\nPress d for 9mobile or type 'Cancel' to go back");
            } else if (userInput.toUpperCase() === 'C') {
              const user = await Users.findOne({ phone: whatsappUserNumber });
              await bot.sendText(msg.from, `You have NGN ${user.walletBalance}  in your wallet balance.\n\n Enter "Cancel" to go back to the main menu!`);
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
            } else if (userInput.toUpperCase() === 'D') {
              await bot.sendText(msg.from, 'Click this link to speak with Expenditures Buddy!\n\n⬇️ https://wa.link/lezjso \n or type Cancel to return back to the main menu!');
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
          case 'CHOOSE_NETWORK':

            if (userInput.toUpperCase() === 'AA') {
              await bot.sendText(whatsappUserNumber, 'Hello dear!');
            }

            if (userInput.toUpperCase() === 'A') {
              var checkUserType = await Users.findOne({ phone: whatsappUserNumber });
              if (checkUserType.userType === 'business') {
                await bot.sendText(
                  msg.from,
                  '\t \t \t MTN Data Plans \n\n'
                        + `a. 500mb --> N${mtn_500mb_business} \n`
                        + `b. 1gb --> N${mtn_1gb_business} \n`
                        + `c. 2gb --> N${mtn_2gb_business} \n`
                        + `d. 3gb --> N${mtn_3gb_business} \n`
                        + `e. 5gb --> N${mtn_5gb_business} \n`
                        + `f. 10gb --> N${mtn_10gb_business} \n`
                        + 'Enter in either a, b, c, d, e, f, or g for the following plans or type \'Cancel\' to go back.',
                );
              } else {
                await bot.sendText(
                  msg.from,
                  '\t \t \t MTN Data Plans \n\n'
                          + `a. 500mb --> N${mtn_500mb} \n`
                          + `b. 1gb --> N${mtn_1gb} \n`
                          + `c. 2gb --> N${mtn_2gb} \n`
                          + `d. 3gb --> N${mtn_3gb} \n`
                          + `e. 5gb --> N${mtn_5gb} \n`
                          + `f. 10gb --> N${mtn_10gb} \n`
                          + 'Enter in either a, b, c, d, e, f, or g for the following plans or type \'CANCEL\' to go back.',
                );
              }
              userState = 'CHOOSE_MTN_PLAN';
              userStates.set(whatsappUserNumber, userState);
            } else if (userInput.toUpperCase() === 'B') {
              var checkUserType = await Users.findOne({ phone: whatsappUserNumber });
              if (checkUserType.userType === 'business') {
                // Airtel Plans here!
                await bot.sendText(msg.from, `
              \t \t \t Airtel Data Plans \n\n
              a. 1gb --> N${airtel_1gb_business} \n
              b. 2gb --> N${airtel_2gb_business} \n
              c. 5gb --> N${airtel_5gb_business} \n
              d. 10gb --> N${airtel_10gb_business} \n
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
              } else {
                await bot.sendText(msg.from, `
              \t \t \t Airtel Data Plans \n\n
              a. 1gb --> N${prices.airtel_1gb} \n
              b. 2gb --> N${prices.airtel_2gb} \n
              c. 5gb --> N${prices.airtel_5gb} \n
              d. 10gb --> N${prices.airtel_10gb} \n
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
              }

              userState = 'CHOOSE_AIRTEL_PLAN';
              userStates.set(whatsappUserNumber, userStates);
              console.log(userState);
            } else if (userInput.toUpperCase() === 'C') {
              var checkUserType = await Users.findOne({ phone: whatsappUserNumber });
              userState = 'CHOOSE_GLO_PLAN';
              userStates.set(whatsappUserNumber, userState);

              if (checkUserType.userType === 'business') {
                await bot.sendText(msg.from, ` \t \t \t GLO Data Plans \n
              a. GLO 500MB --> NGN ${glo_500mb_business} \n
              b. GLO 1GB --> NGN ${glo_1gb_business} \n
              c. GLO 2GB --> NGN ${glo_2gb_business} \n
              d. GLO 3GB --> NGN ${glo_3gb_business} \n
              e. GLO 5GB --> NGN ${glo_5gb_business} \n
              f. GLO 10GB --> NGN ${glo_10gb_business} \n
                        
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
              } else {
                await bot.sendText(msg.from, ` \t \t \t GLO Data Plans \n
              a. GLO 500MB --> NGN ${glo_500mb} \n
              b. GLO 1GB --> NGN ${glo_1gb} \n
              c. GLO 2GB --> NGN ${glo_2gb} \n
              d. GLO 3GB --> NGN ${glo_3gb} \n
              e. GLO 5GB --> NGN ${glo_5gb} \n
              f. GLO 10GB --> NGN ${glo_10gb} \n
              
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
              `);
              }
            } else if (userInput.toUpperCase() === 'D') {
              var checkUserType = await Users.findOne({ phone: whatsappUserNumber });

              userState = 'CHOOSE_9mobile_PLAN';
              userStates.set(whatsappUserNumber, userState);

              if (checkUserType.userType === 'business') {
                await bot.sendText(msg.from, ` \t \t \t 9mobile Data Plans \n
                a. 9mobile 1GB -> NGN ${nin_mobile_1gb_business} \n
                b. 9mobile 2GB -> NGN ${nin_mobile_2gb_business} \n
                c. 9mobile 3GB -> NGN ${nin_mobile_3gb_business} \n
                d. 9mobile 5GB -> NGN ${nin_mobile_5gb_business} \n
                e. 9mobile 10GB -> NGN ${nin_mobile_10gb_business} \n
                          
                Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
              `);
              } else {
                await bot.sendText(msg.from, ` \t \t \t 9mobile Data Plans \n
                a. 9mobile 1GB --> NGN ${nin_mobile_1gb} \n
                b. 9mobile 2GB --> NGN ${nin_mobile_2gb} \n
                c. 9mobile 3GB --> NGN ${nin_mobile_3gb} \n
                d. 9mobile 5GB --> NGN ${nin_mobile_5gb} \n
                e. 9mobile 10GB --> NGN ${nin_mobile_10gb} \n
                          
                Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
              `);
              }
            } else if (userInput.toUpperCase() === 'CANCEL') {
              userState = 'START';
              userStates.set(whatsappUserNumber, userState);
            }
            break;
          case 'CHOOSE_MTN_PLAN':
            if (userInput.toUpperCase() === 'CANCEL') {
              userState = 'START';
              userStates.set(whatsappUserNumber, userState);
            }
            switch (userInput.toUpperCase()) {
              // 15gb plan

              case 'G':
              case 'H':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                userStates.set(whatsappUserNumber, userState);
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'data_share_250mb', mtn_15gb_business, 1002, msg, 'mtn', 'sme', userState, userStates, bot, 1, 235, 15000.00, '01', userInput);
                } else {
                  await buyData(whatsappUserNumber, 'data_share_250mb', mtn_15gb, 10002, msg, 'mtn', 'sme', userState, userStates, bot, 1, 235, 15000.00, '01');
                }

                break;
              case 'A':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                userStates.set(whatsappUserNumber, userState);
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_500mb', mtn_500mb_business, 10, msg, 'mtn', 'sme', userState, userStates, bot, 1, 214, 500.0, '01', userInput, 212, 500.00, 10, mtn_500mb_CG_business, '1gb');
                }

                return await buyData(whatsappUserNumber, 'data_share_500mb', mtn_500mb, 1, msg, 'mtn', 'sme', userState, userStates, bot, 1, 214, 500.0, '01', userInput, 212, 500.00, 10, mtn_500mb_CG, '500mb');

                break;
              case 'O':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                userStates.set(whatsappUserNumber, userState);
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'data_share_250mb', mtn_250mb_business, 1, msg, 'mtn', 'sme', userState, userStates, bot, 1, 216, 250.00, '01', userInput, 216, 250.00, 1000000, mtn_250mb_CG, '250mb');
                } else {
                  await buyData(whatsappUserNumber, 'data_share_250mb', mtn_250mb, 1, msg, 'mtn', 'sme', userState, userStates, bot, 1, 216, 250.00, '01', userInput, 216, 250.00, 1000000, mtn_250mb_CG, '250mb');
                }
                break;
              case 'B':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';

                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'data_share_1gb', mtn_1gb_business, 2, msg, 'mtn', 'sme', userState, userStates, bot, 1, 7, 1000.0, '01', userInput, 213, 1000.00, 2, mtn_1gb_CG_business, '1gb');
                }

                return await buyData(whatsappUserNumber, 'data_share_1gb', mtn_1gb, 2, msg, 'mtn', 'sme', userState, userStates, bot, 1, 7, 1000.0, '01', userInput, 213, 1000.00, 2, mtn_1gb_CG, '1gb');

                break;
              case 'C':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'data_share_2gb', mtn_2gb_business, 3, msg, 'mtn', 'sme', userState, userStates, bot, 1, 8, 2000.0, '01', userInput, 231, 2000.00, 3, mtn_2gb_CG_business, '2gb');
                } else {
                  return await buyData(whatsappUserNumber, 'data_share_2gb', mtn_2gb, 3, msg, 'mtn', 'sme', userState, userStates, bot, 1, 8, 2000.0, '01', userInput, 231, 2000.00, 3, mtn_2gb_CG, '2gb');
                }
                break;
              case 'D':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'data_share_3gb', mtn_3gb_business, 4, msg, 'mtn', 'sme', userState, userStates, bot, 1, 44, 3000.0, '01', userInput, 232, 3000.00, 4, mtn_3gb_CG_business, '3gb');
                } else {
                  await buyData(whatsappUserNumber, 'data_share_3gb', mtn_3gb, 4, msg, 'mtn', 'sme', userState, userStates, bot, 1, 44, 3000.0, '01', userInput, 232, 3000.00, 4, mtn_3gb_CG, '3gb');
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
              case 'E':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'data_share_5gb', mtn_5gb_business, 5, msg, 'mtn', 'sme', userState, userStates, bot, 1, 11, 5000.0, '01', userInput, 233, 5000.00, 5, mtn_5gb_CG_business, '5gb');
                } else {
                  await buyData(whatsappUserNumber, 'data_share_5gb', mtn_5gb, 5, msg, 'mtn', 'sme', userState, userStates, bot, 1, 11, 5000.0, '01', userInput, 233, 5000.00, 5, mtn_5gb_CG, '5gb');
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
              case 'F':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });

                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'data_share_10gb', mtn_10gb_business, 6, msg, 'mtn', 'sme', userState, userStates, bot, 1, 265, 10000.0, '01', userInput, 266, 10000.00, 6, mtn_10gb_CG_business, '10gb');
                } else {
                  await buyData(whatsappUserNumber, 'data_share_10gb', mtn_10gb, 6, msg, 'mtn', 'sme', userState, userStates, bot, 1, 265, 10000.0, '01', userInput, 266, 10000.00, 6, mtn_10gb_CG, '10gb');
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
              default:
                if (!(userState === 'FUND_WALLET' || userState === 'INPUT_PHONE_NO')) {
                  console.log(userState);
                  await bot.sendText(msg.from, "Invalid option. Please enter a, b, c, d, e, f, or g or type 'Cancel' to go back");

                  break;
                }
            }
            break;
            await bot.sendText(whatsappUserNumber, 'OKAY!');
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
          case 'FUND_WALLET':
            await bot.sendText(msg.from, 'Processing wallet funding...');
            break;
          case 'CHOOSE_GLO_PLAN':
            if (userInput.toUpperCase() === 'CANCEL') {
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUser.number, userState);
            }

            switch (userInput.toUpperCase()) {
              case 'A':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'glo_cg_500mb_30days', glo_500mb_business, 122, msg, 'glo', 'corporate', userState, userStates, bot, 2, 276, 500, '02', userInput, 276, 500, 122, glo_500mb_business, '500mb');
                } else {
                  await buyData(whatsappUserNumber, 'glo_cg_500mb_30days', glo_500mb, 122, msg, 'glo', 'corporate', userState, userStates, bot, 2, 276, 500, '02', userInput, 276, 500, 122, glo_500mb, '500mb');
                }
                userState = 'START';
                userStates.set(whatsappUserNumber, userState);
                break;
              case 'B':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';

                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'glo_cg_1gb_30days', glo_1gb_business, 123, 'glo', 'corporate', userState, userStates, bot, 2, 271, 500, '02', userInput, 194, 1000, 123, glo_1gb_CG_business, '1gb');
                } else {
                  await buyData(whatsappUserNumber, 'glo_cg_1gb_30days', glo_1gb, 123, 'glo', msg, 'corporate', userState, userStates, bot, 2, 271, 500, '02', userInput, 194, 1000, 123, glo_1gb_CG_business, '1gb');
                }
                break;
              case 'C':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';

                // a ---> 500MB, b ---> 1gb, c --> 2gb, d --> 3gb , e --> 5gb, f --> 10gb
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'glo_cg_2gb_30days', glo_2gb_business, 124, 'glo', msg, 'corporate', userState, userStates, bot, 2, 272, 500, '02', userInput, 272, 2000, 124, glo_2gb_CG_business, '2gb');
                } else {
                  await buyData(whatsappUserNumber, 'glo_cg_2gb_30days', glo_2gb, 124, 'glo', msg, 'corporate', userState, userStates, bot, 2, 272, 2000, '02', userInput, 272, 2500.01, 124, glo_2gb_CG_business, '2gb');
                }
                break;
                // a --> 500mb, b --> 1gb, c --> 2gb, d --> 3gb, e --> 5gb, f --> 10gb
              case 'D':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';

                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'glo_cg_3gb_30days', glo_3gb_business, 125, 'glo', msg, 'corporate', userState, userStates, bot, 2, 273, 3000, '02', userInput, 195, 3000, 125, glo_3gb_CG_business, '3gb');
                } else {
                  await buyData(whatsappUserNumber, 'glo_cg_3gb_30days', glo_3gb, 125, 'glo', msg, 'corporate', userState, userStates, bot, 2, 273, 3000, '02', userInput, 195, 3000, 125, glo_3gb_CG_business, '3gb');
                }
                break;
              case 'E':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'glo_cg_5gb_30days', glo_5gb_business, 126, 'glo', msg, 'corporate', userState, userStates, bot, 2, 274, 5000, '02', userInput, 274, 5800.01, 126, glo_5gb_business, '5.8gb');
                } else {
                  await buyData(whatsappUserNumber, 'glo_cg_5gb_30days', glo_5gb, 126, 'glo', msg, 'corporate', userState, userStates, bot, 2, 274, 5000, '02', userInput, 274, 5800.01, 126, glo_5gb_business, '5.8gb');
                }
                break;
              case 'F':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'glo_cg_10gb_30days', glo_10gb_business, 127, 'glo', msg, 'corporate', userState, userStates, bot, 2, 275, 10000, '02', userInput, 275, 10000.01, 127, glo_10gb_CG_business, '10gb');
                } else {
                  await buyData(whatsappUserNumber, 'glo_cg_10gb_30days', glo_10gb, 127, 'glo', msg, 'corporate', userState, userStates, bot, 2, 275, 10000, '02', userInput, 275, 10000.01, 127, glo_10gb_CG_business, '10gb');
                }
                break;
              case 'CANCEL':
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
            }
          case 'CHOOSE_AIRTEL_PLAN':
            checkUserType = await Users.findOne({ phone: whatsappUserNumber });
            if (userInput.toUpperCase() === 'CANCEL') {
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUser.number, userState);
            }
            switch (userInput.toUpperCase()) {
              case 'A':
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                userState = 'INPUT_PHONE_NO';
                if (checkUserType.userType === 'business') {
                  return await buyData(whatsappUserNumber, 'airtel_300mb_7days', airtel_300mb_business, 103220, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 277, 300, '04', userInput, 277, 300, 103220, airtel_300mb_business, '300mb');
                }

                return await buyData(whatsappUserNumber, 'airtel_300mb_7days', airtel_300mb, 103220, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 277, 300, '04', userInput, 277, 300, 103220, airtel_300mb_business, '300mb');

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
                  await buyData(whatsappUserNumber, 'airtel_1gb_30days', airtel_1gb_business, 100, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 236, 1000, '04', userInput, 236, 1000, 100, airtel_1gb_business, '1gb');
                } else {
                  await buyData(whatsappUserNumber, 'airtel_1gb_30days', airtel_1gb, 100, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 236, 1000, '04', userInput, 236, 1000, 100, airtel_1gb_business, '1gb');
                }
                break;
              case 'D':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'airtel_2gb_30days', airtel_2gb_business, 101, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 237, 1000, '04', userInput, 237, 2000, 101, airtel_2gb_business, '2gb');
                } else {
                  await buyData(whatsappUserNumber, 'airtel_2gb_30days', airtel_2gb, 101, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 237, 1000, '04', userInput, 237, 2000, 101, airtel_2gb_business, '2gb');
                }
                break;
              case 'E':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'airtel_5gb_30days', airtel_5gb_business, 102, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 238, 1000, '04', userInput, 238, 2000, 102, airtel_5gb_business, '5gb');
                } else {
                  await buyData(whatsappUserNumber, 'airtel_5gb_30days', airtel_5gb, 102, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 238, 1000, '04', userInput, 238, 2000, 102, airtel_5gb_business, '5gb');
                }
                break;
              case 'F':
                userState = 'INPUT_PHONE_NO';
                checkUserType = await Users.findOne({ phone: whatsappUserNumber });
                if (checkUserType.userType === 'business') {
                  await buyData(whatsappUserNumber, 'airtel_10gb_30days', airtel_10gb_business, 103, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 239, 1000, '04', userInput, 239, 2000, 103, airtel_10gb_business, '10gb');
                } else {
                  await buyData(whatsappUserNumber, 'airtel_10gb_30days', airtel_10gb_business, 103, msg, 'airtel', 'corporate', userState, userStates, bot, 4, 239, 1000, '04', userInput, 239, 2000, 103, airtel_10gb_business, '10gb');
                }
                break;
              default:
                await bot.sendText(msg.from, 'Invalid input. Please follow the instructions.');
                break;
            }
        }
      } catch (error) {
        console.error(error);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
)();

app.listen(PORT, () => {
  console.log('Server started successfully!');
});
