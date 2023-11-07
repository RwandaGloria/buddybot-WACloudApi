const { createBot } = require('whatsapp-cloud-api');
const express = require('express');
const app = express();
const PORT = 9031;
const Users = require("./models/users");
const db = require("./db");

// Other imports...

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Transaction = require('./models/transactions');
const regularPrices = require("./models/regular_prices");
const businessPrices = require("./models/business_prices");
const utils = require(`./utils`);

// Initialize your database connection and other necessary setup...
(async () => {
  try {
    await db.connect();

    const from = '138691232664340';
    const token = process.env.ACCESS_TOKEN;
    const webhookVerifyToken = 'hellogloriathisis';

    const bot = createBot(from, token);

    await bot.startExpressServer({
      webhookVerifyToken: webhookVerifyToken,
      port: 3000,
      webhookPath: `/custom/webhook`,
    });

  const userStates = new Map();
  const getAllRegularUserPrices = await regularPrices.find();
  const getAllBusinessUserPrices = await businessPrices.find();

let mtn_250mb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_250mb').priceValue;
let mtn_500mb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_500mb').priceValue;
let mtn_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_1gb').priceValue;
let mtn_2gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_2gb').priceValue;
let mtn_3gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_3gb').priceValue;
let mtn_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_5gb').priceValue;
let mtn_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_10gb').priceValue;
let mtn_15gb = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_15gb').priceValue;


let mtn_250mb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_250mb').priceValue;
let mtn_500mb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_500mb_CG').priceValue;
let mtn_1gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_1gb_CG').priceValue;
let mtn_2gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_2gb_CG').priceValue;
let mtn_3gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_3gb_CG').priceValue;
let mtn_5gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_5gb_CG').priceValue;
let mtn_10gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_10gb_CG').priceValue;
let mtn_15gb_CG = getAllRegularUserPrices.find((price) => price.priceName === 'mtn_15gb_CG').priceValue;


let mtn_500mb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_500mb_CG').priceValue;
let mtn_1gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_1gb_CG').priceValue;
let mtn_2gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_2gb_CG').priceValue;
let mtn_3gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_3gb_CG').priceValue;
let mtn_5gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_5gb_CG').priceValue;
let mtn_10gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_10gb_CG').priceValue;
let mtn_15gb_CG_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_15gb_CG').priceValue;





let nin_mobile_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_1gb').priceValue;
let nin_mobile_2gb =  getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_2gb').priceValue;
let nin_mobile_3gb =  getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_3gb').priceValue;
let nin_mobile_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_5gb').priceValue;
let nin_mobile_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'nin_mobile_10gb').priceValue;

let glo_500mb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_500mb').priceValue;
let glo_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_1gb').priceValue;
let glo_2gb =  getAllRegularUserPrices.find((price) => price.priceName === 'glo_2gb').priceValue;
let glo_3gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_3gb').priceValue;
let glo_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_5gb').priceValue;
let glo_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'glo_10gb').priceValue;

// Fetch prices for Airtel plans
let airtel_1gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_1gb').priceValue;
let airtel_2gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_2gb').priceValue;
let airtel_5gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_5gb').priceValue;
let airtel_10gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_10gb').priceValue;
let airtel_15gb = getAllRegularUserPrices.find((price) => price.priceName === 'airtel_15gb').priceValue;





// Fetch prices for MTN plans
let mtn_250mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_250mb').priceValue;

let mtn_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_500mb').priceValue;
let mtn_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_1gb').priceValue;
let mtn_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_2gb').priceValue;
let mtn_3gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_3gb').priceValue;
let mtn_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_5gb').priceValue;
let mtn_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'mtn_10gb').priceValue;

// Fetch prices for 9mobile plans
let nin_mobile_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_1gb').priceValue;
let nin_mobile_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_2gb').priceValue;
let nin_mobile_3gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_3gb').priceValue;
let nin_mobile_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_5gb').priceValue;
let nin_mobile_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === '9mobile_10gb').priceValue;

// Fetch prices for Glo plans
let glo_500mb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_500mb').priceValue;
let glo_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_1gb').priceValue;
let glo_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_2gb').priceValue;
let glo_3gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_3gb').priceValue;
let glo_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_5gb').priceValue;
let glo_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'glo_10gb').priceValue;

// Fetch prices for Airtel plans
let airtel_1gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_1gb').priceValue;
let airtel_2gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_2gb').priceValue;
let airtel_5gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_5gb').priceValue;
let airtel_10gb_business = getAllBusinessUserPrices.find((price) => price.priceName === 'airtel_10gb').priceValue;


  bot.on('text', async (msg) => {
      try {

         console.log("Hello")
        const whatsappUserNumber = msg.from;

        // Get the user's state from the global userStates map
        let userState = userStates.get(whatsappUserNumber) || 'START';
        let userInput = (msg.data.text || '').toUpperCase();
        
        async function buyData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, message, network, type, userState, userStates, bot, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN,  CLUBKONECT_MOBILE_NETWORK_CODE, userInput, ROSSY_CG_DATA_ID, CLUBKONECT_CG_DATA_ID, PATOMOBILE_CG_DATA_ID, CG_DATA_PRICE) {


          const user = await Users.findOne({ phone: whatsappUserNumber });
        
          // Set the user's state to INPUT_PHONE_NO to await the phone number
          userState = 'INPUT_PHONE_NO';
          userStates.set(whatsappUserNumber, userState);
          await bot.sendText(whatsappUserNumber, "Enter phone number to buy data, Enter it like this: 08166358607 or type 'Cancel' to go back."); 

          bot.on("message",  async (msg) => {

            console.log(userInput);
            if (msg.data.text.toUpperCase() === 'CANCEL') 
            {
              userInput = "";
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);     
              return;
            }
                if(userInput.toUpperCase() !== "CANCEL" && userState !== "START") {
                  // Handle the user's phone number input and data purchase logic here
                  const getPhoneNo = msg.data.text;
                  const result = await utils.validateUserPhoneNo(getPhoneNo);
        
                  if (result) {
                    // Validate the phone number and process data purchase
                    const buyDataResponse = await utils.fetchData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, getPhoneNo, network, type, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE);
                    await bot.sendText(whatsappUserNumber, buyDataResponse);
                    userState = 'START'; // Return to the main menu
                    userStates.set(whatsappUserNumber, userState);
                    return 
        
                  } else {
                    // Handle invalid phone number input
                    await bot.sendText(whatsappUserNumber, "Invalid phone number format. Enter it like this: 08166358607 or type 'Cancel' to go back.");
                    return;
        
                  
                }
              }
          });
          // Listen for the user's response
      
          }

        if(userInput.toUpperCase() === "START") {
          userState = "START"
          userStates.set(whatsappUserNumber, userState);

        } 

        switch (userState) {

          case "BUYING_CG_DATA": 
          console.log("Buying CG data....");
          break;
          case 'START':
            if (userInput.toUpperCase() === 'A' ) 
            {

              userState = 'FUND_WALLET';
              userStates.set(whatsappUserNumber, userState);
              console.log(userState);
              await bot.sendText(msg.from, "Enter the amount you would like to use to fund your wallet, please note that funding requires N50: ⬇️ \n\n To go back, enter Cancel ");
            } 
            else if (userInput.toUpperCase() === 'B') {

  
              userState = 'CHOOSE_NETWORK';
              console.log(userState);
              userStates.set(whatsappUserNumber, userState);
              await bot.sendText(msg.from, "Which network would you like to purchase your data in?\nPress a for MTN\nPress b for Airtel\nPress c for Glo\nPress d for 9mobile or type 'Cancel' to go back");
            }
            else if(userInput.toUpperCase() === "C") 
            {
              const user = await Users.findOne({ phone: whatsappUserNumber });
              await bot.sendText(msg.from, `You have NGN ${user.walletBalance}  in your wallet balance.\n\n Enter "Cancel" to go back to the main menu!`);
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
            }

            else if(userInput.toUpperCase() === "D"){

              await bot.sendText(msg.from, "Click this link to speak with Expenditures Buddy!\n\n⬇️ https://wa.link/lezjso \n or type Cancel to return back to the main menu!" );
            }
            else if (userInput.toUpperCase()=== "E")
            {
              userState ="INPUT_DATA_2_ANOTHER_USER"
              userStates.set(whatsappUserNumber, userState);
            }
          
            else {
              console.log(userState);
              await bot.sendText(msg.from, `Welcome to Expenditures Buddy, your internet data bundles socket! 🤩 \n\n 
            a --> Fund wallet
            b --> Buy data
            c --> Check wallet balance
            d --> For inquiries and partnerships. \n\n Please enter one of the following options to get started, a or b or c: \n`);
            }
            break;
            case "CHOOSE_NETWORK":

            if(userInput.toUpperCase() === "AA"){
              await bot.sendText(whatsappUserNumber, "Hello dear!");
            }

            if(userInput.toUpperCase() === "A") {
                    var checkUserType  =  await Users.findOne({ phone: whatsappUserNumber });
                    if(checkUserType.userType === "business") 
                    {
                      await bot.sendText(msg.from, 
                        `\t \t \t MTN Data Plans \n\n` +
                        `a. 500mb --> N${mtn_500mb_business} \n` + 
                        `b. 1gb --> N${mtn_1gb_business} \n` +
                        `c. 2gb --> N${mtn_2gb_business} \n` +
                        `d. 3gb --> N${mtn_3gb_business} \n` +
                        `e. 5gb --> N${mtn_5gb_business} \n` +
                        `f. 10gb --> N${mtn_10gb_business} \n` +
                        `Enter in either a, b, c, d, e, f, or g for the following plans or type 'Cancel' to go back.`
                      );
                    }
                    else {
                        await bot.sendText(msg.from, 
                          '\t \t \t MTN Data Plans \n\n' +
                          `a. 500mb --> N${mtn_500mb} \n` + 
                          `b. 1gb --> N${mtn_1gb} \n` +
                          `c. 2gb --> N${mtn_2gb} \n` +
                          `d. 3gb --> N${mtn_3gb} \n` +
                          `e. 5gb --> N${mtn_5gb} \n` +
                          `f. 10gb --> N${mtn_10gb} \n` +
                          `Enter in either a, b, c, d, e, f, or g for the following plans or type 'CANCEL' to go back.`
                        );
                      }
                      userState = "CHOOSE_MTN_PLAN";
                      userStates.set(whatsappUserNumber, userState);
                    
                     }     
            else if(userInput.toUpperCase() === "B") {
                    if(checkUserType.userType === "business") 
                      {
                        //Airtel Plans here! 
                      await bot.sendText(msg.from,  `
              \t \t \t Airtel Data Plans \n\n
              a. 1gb --> N${airtel_1gb_business} \n
              b. 2gb --> N${airtel_2gb_business} \n
              c. 5gb --> N${airtel_5gb_business} \n
              d. 10gb --> N${airtel_10gb_business} \n
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
                      }
            else {
                      await bot.sendText(msg.from,  `
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
    
            }
            else if(userInput.toUpperCase() === "C") {
          
            userState = "CHOOSE_GLO_PLAN";
            userStates.set(whatsappUserNumber, userState);
    
            if(checkUserType.userType === "business") 
            {
    
    
              await bot.sendText(msg.from, ` \t \t \t GLO Data Plans \n
              a. GLO 500MB --> NGN ${glo_500mb_business} \n
              b. GLO 1GB --> NGN ${glo_1gb_business} \n
              c. GLO 2GB --> NGN ${glo_2gb_business} \n
              d. GLO 3GB --> NGN ${glo_3gb_business} \n
              e. GLO 5GB --> NGN ${glo_5gb_business} \n
              f. GLO 10GB --> NGN ${glo_10gb_business} \n
                        
              Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
            `);
            }
            else {
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
           }
           else if(userInput.toUpperCase() === "D") {
              userState = "CHOOSE_9mobile_PLAN";
              userStates.set(whatsappUserNumber, userState);
    
              if(checkUserType.userType === "business") 
              {
    
    
                await bot.sendText(msg.from, ` \t \t \t 9mobile Data Plans \n
                a. 9mobile 1GB -> NGN ${nin_mobile_1gb_business} \n
                b. 9mobile 2GB -> NGN ${nin_mobile_2gb_business} \n
                c. 9mobile 3GB -> NGN ${nin_mobile_3gb_business} \n
                d. 9mobile 5GB -> NGN ${nin_mobile_5gb_business} \n
                e. 9mobile 10GB -> NGN ${nin_mobile_10gb_business} \n
                          
                Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
              `);
              }
              else {
    
                await bot.sendText(msg.from, ` \t \t \t 9mobile Data Plans \n
                a. 9mobile 1GB --> NGN ${nin_mobile_1gb} \n
                b. 9mobile 2GB --> NGN ${nin_mobile_2gb} \n
                c. 9mobile 3GB --> NGN ${nin_mobile_3gb} \n
                d. 9mobile 5GB --> NGN ${nin_mobile_5gb} \n
                e. 9mobile 10GB --> NGN ${nin_mobile_10gb} \n
                          
                Enter in either a, b, c, d, e, f for the following plans or type 'Cancel' to go back.
              `);
              }
    
            }
          else if(userInput.toUpperCase() === "CANCEL") 
          {
            userState = "START";
            userStates.set(whatsappUserNumber, userState);
        }
            break;
            case 'CHOOSE_MTN_PLAN':   

            if(userInput.toUpperCase() === "CANCEL") {
              userState = "START";
              userStates.set(whatsappUserNumber, userState); 
            } 
            switch (userInput.toUpperCase()) {
                //15gb plan

          case "G": 
           case "H": 
           checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
           userState = "INPUT_PHONE_NO";
           userStates.set(whatsappUserNumber, userState);
           if(checkUserType.userType === "business") 
           {
             await buyData(whatsappUserNumber,  "data_share_250mb", mtn_15gb_business, 1002, msg, "mtn", "sme", userState, userStates, bot, 1, 235, 15000.00, "01", userInput);
           }
           else 
           {
            await buyData(whatsappUserNumber,  "data_share_250mb", mtn_15gb, 10002, msg, "mtn", "sme", userState, userStates, bot, 1, 235, 15000.00, "01");
           }  
    
           break;
           case 'A':
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
               userState = "INPUT_PHONE_NO";
               userStates.set(whatsappUserNumber, userState);
               if(checkUserType.userType === "business") 
               {
                 return await buyData(whatsappUserNumber,  "data_share_500mb", mtn_500mb_business, 10, msg, "mtn", "sme", userState, userStates, bot, 1, 214, 500.0, "01", userInput);
               }
               else 
               {
                 await buyData(whatsappUserNumber,  "data_share_500mb", mtn_500mb, 1, msg, "mtn", "sme", userState, userStates, bot, 1, 214, 500.0, "01", userInput);
               }  
               break;
          case "O":     
            checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
            userState = "INPUT_PHONE_NO";
            userStates.set(whatsappUserNumber, userState);
            if(checkUserType.userType === "business") 
            {
              await buyData(whatsappUserNumber,  "data_share_250mb", mtn_250mb_business, 1, msg, "mtn", "sme", userState, userStates, bot, 1, 216, 250.00, "01");
            }
            else 
            {
              await buyData(whatsappUserNumber,  "data_share_500mb", mtn_250mb, 1, msg, "mtn", "sme", userState, userStates, bot, 1, 216, 500.0, "01");
            }  
            break;
        
                 checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                userState = "INPUT_PHONE_NO";
                userStates.set(whatsappUserNumber, userState);
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "data_share_500mb", mtn_500mb_business, 1, msg, "mtn", "sme", userState, userStates, bot, 1, 212, 500.0, "01");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "data_share_500mb", mtn_500mb, 1, msg, "mtn", "sme", userState, userStates, bot, 1, 212, 500.0, "01");
                }  
                break;
          case 'B':
                   checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                  userState = "INPUT_PHONE_NO";
    
                  if(checkUserType.userType === "business") 
                  {
                    await buyData(whatsappUserNumber,  "data_share_1gb", mtn_1gb_business, 2, msg, "mtn", "sme", userState, userStates, bot, 1, 7, 1000.0, "01");
                  }
                  else 
                  {
                    await buyData(whatsappUserNumber,  "data_share_1gb", mtn_1gb, 2, msg, "mtn", "sme", userState, userStates, bot, 1, 7, 1000.0, "01");
                  }  
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  break;
         case 'C':
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                userState = "INPUT_PHONE_NO";    
                if(checkUserType.userType === "business") 
                {
                  await buyData (whatsappUserNumber, "data_share_2gb", mtn_2gb_business, 3, msg, "mtn", "sme", userState, userStates, bot, 1, 8, 2000.0, "01");
                }
                else 
                {
                  await buyData (whatsappUserNumber, "data_share_2gb", mtn_2gb, 3, msg, "mtn", "sme", userState, userStates, bot, 1, 8, 2000.0, "01");
                }  
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
        case 'D':
                userState = "INPUT_PHONE_NO";
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
    
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber, "data_share_3gb", mtn_3gb_business, 4, msg, "mtn", "sme", userState, userStates, bot, 1, 44, 3000.0, "01");
                }
                else 
                {
                  await buyData(whatsappUserNumber, "data_share_3gb", mtn_3gb, 4, msg, "mtn", "sme", userState, userStates, bot, 1, 44, 3000.0, "01");
                }  
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
        case 'E':
                userState = "INPUT_PHONE_NO";
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
    
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber, "data_share_5gb", mtn_5gb_business, 5, msg, "mtn", "sme", userState, userStates, bot, 1, 11, 5000.0, "01");
                }
                else 
                {
                  await buyData(whatsappUserNumber, "data_share_5gb", mtn_5gb, 5, msg, "mtn", "sme", userState, userStates, bot, 1, 11, 5000.0, "01");
                }  
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
        case 'F':
                userState = "INPUT_PHONE_NO";
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
    
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber, "data_share_10gb", mtn_10gb_business, 6, msg, "mtn", "sme", userState, userStates, bot, 1,265, 10000.0, "01");
                }
                else 
                {
                  await buyData(whatsappUserNumber, "data_share_10gb", mtn_10gb, 6, msg, "mtn", "sme", userState, userStates, bot, 1,265, 10000.0, "01");
                }  
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
                default:
              if(!(userState === "FUND_WALLET" || userState === "INPUT_PHONE_NO") ) 
              {
                console.log(userState);
                await bot.sendText(msg.from, "Invalid option. Please enter a, b, c, d, e, f, or g or type 'Cancel' to go back");
                
                break;
              }
            }
            break;
            await bot.sendText(whatsappUserNumber, "OKAY!");
            break; 
            case 'A':
            if (userInput === 'A') 
            {
              // Update the user's state to 'FUND_WALLET' and send a message
              userState = 'FUND_WALLET';
              userStates.set(whatsappUserNumber, userState);
              await bot.sendText(msg.from, 'Enter the amount to fund your wallet.');
            }
            break;
          case "INPUT_PHONE_NO": 
          console.log("Input phone number case!...");
          break;
          case 'FUND_WALLET':
            await bot.sendText(msg.from, 'Processing wallet funding...');
            break;
         case "CHOOSE_GLO_PLAN": 
            if(userInput.toUpperCase() ===  'CANCEL') {
            userState = 'START'; // Return to the main menu
              userStates.set(whatsappUser.number, userState);

              data = await bot.sendText(whatsappUserNumber, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
              
            }
            else if(userInput.toUpperCase() === "A") { 
            userState  = "INPUT_PHONE_NO";

            
            checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
            if(checkUserType.userType === "business") 
            {
              await buyData(whatsappUserNumber,  "glo_cg_500mb_30days", glo_500mb_business, 122, "glo", "corporate", userInput);
            } 
            else 
            {
              await buyData(whatsappUserNumber,  "glo_cg_500mb_30days", glo_500mb, 122, "glo", "corporate", userInput);
            }
            userState = 'START'; 
            userStates.set(whatsappUserNumber, userState);
        }
            else if (userInput.toUpperCase() === "B") { 
            userInput = null;
            userState  = "INPUT_PHONE_NO";
            checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
             if(checkUserType.userType === "business") 
             {
               await buyData(whatsappUserNumber,  "glo_cg_1gb_30days", glo_1gb_business, 123, "glo", "corporate",  userState, userStates, bot);
   
             }else {
              await buyData(whatsappUserNumber,  "glo_cg_1gb_30days", glo_1gb, 123,"glo", "corporate", userState, userStates, bot);
            }
            userState = 'START'; // Return to the main menu
            userStates.set(whatsappUserNumber, userState);
         }
           else if(userInput.toUpperCase() === "C"){ 
  
            userState  = "INPUT_PHONE_NO";
            checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
  
            if(checkUserType.userType === "business") 
            {
              await buyData(whatsappUserNumber,  "glo_cg_500mb_30days", glo_2gb_business, 122, "glo", "corporate", userInput)
  
            }
            else {
             await buyData(whatsappUserNumber,  "glo_cg_1gb_30days", glo_2gb, 123,"glo");
           }
           userState = 'START'; // Return to the main menu
           userStates.set(whatsappUserNumber, userState);
        }            
            else if(userInput.toUpperCase() === "D") {

            checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
            userState  = "INPUT_PHONE_NO";
  
            if(checkUserType.userType === "business") 
            {
              await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_3gb_business, 125, "glo", "corporate", userInput);
            }
            else 
            {
              await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_3gb, 125, "glo", "corporate", userInput);
            }
            userState = 'START'; // Return to the main menu
            userStates.set(whatsappUserNumber, userState);
        }
           else  if(userInput.toUpperCase() === "E") { 
            checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
            userState  = "INPUT_PHONE_NO";
            if(checkUserType.userType === "business") 
            {
              await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_5gb_business, 125, "glo", "corporate", userInput);
            }
            else 
            {
              await buyData(whatsappUserNumber,  "glo_cg_5gb_30days", glo_5gb, 126, "glo", "corporate", userInput);
            }
            userState = 'START'; // Return to the main menu
            userStates.set(whatsappUserNumber, userState);
        }
           else  if(userInput.toUpperCase() === "F"){ 
            checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
            userState  = "INPUT_PHONE_NO";
            if(checkUserType.userType === "business") 
            {
              await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_10gb_business, 125, "glo", "corporate", userInput);
            }
            else 
            {
              await buyData(whatsappUserNumber,  "glo_cg_10gb_30days", glo_10gb, 127, "glo", "corporate", userInput);
            }
            userState = 'START'; // Return to the main menu
            userStates.set(whatsappUserNumber, userState);
        }
            else if (userInput.toUpperCase() === 'CANCEL') 
            {
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
              data = await bot.sendText(whatsappUserNumber, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
              
            }

          default:
            // Handle any unexpected state
            await bot.sendText(msg.from, 'Invalid input. Please follow the instructions.');
            break;
        }
      } catch (error) {
        console.error(error);
      }
    });
  } catch (err) 
  {
    console.error(err);
  }
}
)
();

app.listen(PORT, () => {
    console.log(`Server started successfully!`);
});