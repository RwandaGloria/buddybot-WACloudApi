const axios = require("axios");
const eventEmitter = require("events");
const { PhoneNumberUtil } = require("google-libphonenumber");
const db = require("./db");
const Users = require("./models/users");
const logger = require("./logger");
const Transaction = require("./models/transactions");
const transaction = require("./models/transactions");
const couponCodes = require("./models/coupon_codes");
const links = require("./models/links");
const { level } = require("winston");
require("dotenv").config();

const PATOMOBILE_API_KEY = process.env.PATOMOBILE_API_KEY;
const PATOMOBILE_ID = process.env.PATOMOBILE_ID;
const DATAAVE_API_KEY = process.env.DATAAVE_API_KEY;
const PHONE_NO_WHATSAPP_MSG=process.env.PHONE_NO_WHATSAPP_MSG;
const MY_DOMAIN_NAME=process.env.MY_DOMAIN_NAME;
const ROSSYTECH_API_KEY=process.env.ROSSYTECH_API_KEY;

const messageTemplate = "Please press 1 to enter fund wallet\nPress 2 to Buy Data\nPress 3 to make inquiries or to make a bot for your business.";

async function createUser(user_phone_no, name, userType) {
  try {
    let user = await Users.findOne({ phone: user_phone_no });
    if (user === null) {
      const newUser = new Users({ phone: user_phone_no, walletBalance: 0, name: name, userType: "regular"});
      await newUser.save();
      user = newUser;
    }
    return `Welcome to Expenditures Buddy!\nYou have ${user.walletBalance} in your wallet balance\n${messageTemplate}`;
  } catch (err) {
    logger.log({ level: "warn", message: `Unable to create user: ${err}\nAt ${Date.now}` });
    return err.message;
  }
}


async function fetchData(whatsappUserNumber, DataAvenuePrice_ID,  price,PatoMobile_data_id , phoneNumber, network, type, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN,  CLUBKONECT_MOBILE_NETWORK_CODE) {

  //number --> Whatsapp User number
  //phone --> Phone Number you want to send data to. 
  try {
    const user = await Users.findOne({ phone: whatsappUserNumber });

    let checkUserWalletBalance= await checkUserBalance(whatsappUserNumber, price);

    console.log(phoneNumber)
    if (checkUserWalletBalance === false) 
    { 

      return `You have insufficient funds in your wallet to make this transaction, as your wallet balance is only ${user.walletBalance} NGN. \n\n Please enter 1 to fund your wallet.  or enter Cancel to return to the main menu`;
    }

    const patoMobileApiUrl = 'https://patomobile.com/wp-content/plugins/vprest/';

    // const patoMobileApiUrl = `https://patomobile.com/wp-content/plugins/vprest/?id=${PATOMOBILE_ID}&apikey=${PATOMOBILE_API_KEY}&q=data&phone=${phoneNumber}&network=airtel&type=${type}&dataplan=${PatoMobile_data_id}`;

    const queryParams = {
      id: `${PATOMOBILE_ID}`,
      apikey: `${PATOMOBILE_API_KEY}`,
      q: 'data',
      phone: phoneNumber,
      network: `${network}`,
      type: `${type}`,
      dataplan: `${PatoMobile_data_id}`
    };

    console.log({
      type: type, 
      phoneNumber: phoneNumber, 
      dataplan: PatoMobile_data_id, 
      network: network
    });
    const PatoMobileResponse = await axios.get(patoMobileApiUrl, { params: queryParams });
    const stringedData = JSON.stringify(PatoMobileResponse.data, null, 2);
    console.log(network);
   
    console.log(PatoMobileResponse.data);
    console.log("---------------->  Patomobile DATA Response" + "\n " )
    console.log(`${PatoMobileResponse.data}`);
    let updatedUser;


    const JSONData = PatoMobileResponse.data

    if(JSONData.Successful === "true") 
    {
      console.log("It has response ---> So its successful!");
       updatedUser = await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } }, 
        { new: true });
      
      return `${JSONData.Data_Plan} Data sent successfully to ${phoneNumber}! Check data balance. Your new wallet balance is ${updatedUser.walletBalance} NGN. \n\nYou can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;

    }
  
    else 
    {

      const rossyResponse = await buyFromRossyTech(ROSSY_NETWORK_ID, phoneNumber, ROSSY_PLAN_ID);
      const rossyResponseData = rossyResponse;

      const checkIfRossyTransactionIsSuccessful = await isRossyTransactionSuccessful(rossyResponseData);


     if(checkIfRossyTransactionIsSuccessful) 
     {
      
       updatedUser = await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } }, 
        { new: true });
           return `${rossyResponseData.plan_network} ${rossyResponseData.plan_name} data sent successfully to ${phoneNumber} \n\n Your new wallet balance is ${updatedUser.walletBalance} NGN. \n\nYou can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;
     }

     else 
     {
     const clubKonectResponse = await  clubKonect(phoneNumber, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE);
    const clubKonectResponseData = clubKonectResponse.data;
    
    if(isClubKonnectTransactionSuccessful(clubKonectResponseData)) 
    {

      updatedUser = await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } }, 
        { new: true });

      return `${clubKonectResponseData.mobilenetwork} ${clubKonectResponseData.productname} Data sent successfully to ${phoneNumber} \n\n Your new wallet balance is ${updatedUser.walletBalance} NGN. \n\nYou can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;

    }

    else 
    {

      console.log(clubKonectResponseData);
      logger.log({
        level: "error", 
        message: `Error connecting to ClubKonnect: ${clubKonectResponseData}`
      });

      await bot.sendText(whatsappUserNumber, "We're really sorry but SME data isn't available. Would you rather buy Direct data, although it's slightly more expensive but lasts the same timeframe as SME data. ");
      return `Boss! we're sorry you can't buy data at this time. There is a problem from our side. You can try going back to the main menu to buy CG data or try again in some minutes please. Thank you for your understanding! 🤲`
    }

     }
    }
  } catch (err) {
    console.log(err)
    logger.error(err.message)
    return err.message;
  }
}

async function clubKonect(phoneNoForPurchase, CLUBKONECT_DATA_PLAN, CLUBKONECT_MOBILE_NETWORK_CODE) {
  try
  {
  const CLUBKONECT_API_KEY= process.env.CLUBKONECT_API_KEY;
  const CLUBKONECT_USER_ID=process.env.CLUBKONECT_USER_ID;
  const url = `https://www.nellobytesystems.com/APIDatabundleV1.asp?UserID=${CLUBKONECT_USER_ID}&APIKey=${CLUBKONECT_API_KEY}&MobileNetwork=${CLUBKONECT_MOBILE_NETWORK_CODE}&DataPlan=${CLUBKONECT_DATA_PLAN}&MobileNumber=${phoneNoForPurchase}`;
  const response = await axios.post(url);
  const responseData = response.data;
  console.log(response.data);
  return responseData;

}
catch(err)
{
  logger.log({
    level: "error", 
    message: `Error in ClubKonnect: ${err}`
  });
  console.log(err);
}
  
  }

  async function buyFromRossyTech(network_id, phoneNoForPurchase, plan_id) {
    try {
      const data = {
        network: network_id,
        mobile_number: phoneNoForPurchase,
        plan: plan_id,
        Ported_number: true
      };
  
      console.log(data);
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://rossytechs.com/api/data/',
        headers: {
          'Authorization': `Token ${ROSSYTECH_API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: data
      };
  
      const response = await axios(config); // Use 'await' to make the Axios call
  
      return response.data;
    } catch (err) {
      logger.log({
        level: "error",
        message: `Error connecting to RossyTech: ${err} ....${err.message}`
      });
  
      return err.message;
    }
  }
  
async function validateUserPhoneNo(number) {

  try {

    const regexPattern = /^0\d{10}$/;

    const isNigerianNumber = regexPattern.test(number);
    
    if(!isNigerianNumber) 
    {
      console.log("INvalid regex pattern!")
      return false;
    }
    else {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const phoneNumber = `${number}`;
    const result = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber, "NG"));
    return result;
  }
 } 
 catch (error) {

    console.error("Error:", error);
  }

}

async function buyDataFromDataAvenue(DataAvenuePrice_ID, phoneNumber, price, whatsappUserNumber, network) {

  console.log(whatsappUserNumber)
  const user = await Users.findOne({ phone: whatsappUserNumber });
  console.log(user);

  
  let DATAAVE_API_KEY = process.env.DATAAVE_API_KEY;

  const apiUrl = `https://dataavenue.ng/api/v2/datashare/?api_key=${DATAAVE_API_KEY}&product_code=${DataAvenuePrice_ID}&phone=${phoneNumber}&callback=https://dataavenue.ng/webhook.php`;

  const response = await axios.post(apiUrl);
  const confirmTransaction = response.data;

  console.log(`confirmTransaction is `+ confirmTransaction.error_code);
  const error_code = (confirmTransaction.error_code).toString()
  
  if (error_code === "1982") {
    return ("I'm really sorry! There is a problem with our data servers now. Can you please try again later :( \n\n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance");
     
  }

 else  if (error_code === "1978") 
 {
    return "I'm really sorry, it seems we are having some problems with our servers. Please check back; we are sorry for the inconvenience, and we would never want to be intentionally unable to provide you with constant data supply.   \n You can Enter in any of the following:   \n\n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance";
  }

  else if (error_code === "1983") {
    logger.error({message: "Kindly update your data avenue wallet please!"})
    return `Can you please try again in an hour please. I'm really sorry!.  \n You can Enter in any of the following:   \n\n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;

    
  }

 else if (error_code === "1986") {
    const dataTransactionID = response.data.data.recharge_id;
    const confirmTransactionResponse = await axios.get(
      `https://dataavenue.ng/api/v2/datashare/?api_key=${DATAAVE_API_KEY}&order_id=${dataTransactionID}&task=check_status`
    );

    if(confirmTransactionResponse.data.text_status === "COMPLETED" || confirmTransactionResponse.data.data.text_status === "COMPLETED") 
    {
      const updatedUser = await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } }, 
        { new: true });

        const newTransaction = await Transaction.create({
          user_phoneNumber: `${whatsappUserNumber}`,
          amount: price, 
          txntype: "debit",
          details: {
            desc: ` ${network} Data Purchase `,
            amount: `${price}`,
            phoneNumberForData: `${phoneNumber}`
            }} )

      return `NGN ${price} Data sent successfully to ${phoneNumber}! Check data balance. Your new wallet balance is ${updatedUser.walletBalance} NGN. \n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;

    }

    else 
    {
      const updatedUser = await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } }, 
        { new: true });

        const newTransaction = await Transaction.create({
          user_phoneNumber: whatsappUserNumber,
          amount: price, 
          txntype: "debit",
          details: {
            desc: ` ${network} Data Purchase `,
            amount: `${price}`,
            phoneNumberForData: `${phoneNumber}`
            }} )

      return `You would soon receive the data, please check your balance, it is still processing. The data has been sent to ${phoneNumber}! Check data balance. Your new wallet balance is ${updatedUser.walletBalance} NGN. \n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;

    }
  } else
  {
    return "Sorry, it seems something is wrong with our data providers. Please again later. \n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance";
  }

}

async function checkUserBalance(whatsappUserNumber, amount) {
  const user = await Users.findOne({ phone: whatsappUserNumber.toString() });
  console.log(user);

  if(user.walletBalance >= amount) {
    return true;
  }
  else {
    return false;
  }

}

function generateRandomReferenceID() {
  const randomID = Math.floor(1000000 + Math.random() * 9000000);
  return randomID.toString();
}

async function generateRandomNumbersForCoupon()
{


  try{
  const length = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let couponCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    couponCode += characters.charAt(randomIndex);
  }

  return couponCode;

} catch(err){

  console.log(err);
  logger.error(err);
  return res.status(500).send(err);

}
}

async function generateCouponCodeAndSaveToDb(phoneNo, dataAmount) 
{

  try{
  //generate six digit coupon code and save to the database
  const sixDigitCouponCode = await generateRandomNumbersForCoupon();

  //couponCode=234 567
  //phoneNumber
  //create new coupon code. 
  const createCodeInDB = await couponCodes.create({
    couponCode: sixDigitCouponCode, 
    senderPhoneNo: phoneNo, 
    dataAmount: dataAmount
  });

  return createCodeInDB.couponCode;
} 
catch(err){

  logger.error(err);
  console.log(err);
  return res.status(500).send(err);

}

}

async function sendCouponCodeURLToExpBuddy(whatsappName, whatsappUserNumber, dataAmount) 
{

  try {
 const couponCode = await generateCouponCodeAndSaveToDb(whatsappUserNumber, dataAmount);

 const url = `https://api.whatsapp.com/send?phone=${PHONE_NO_WHATSAPP_MSG}&text=Hi!%20I%27m%20from%20${whatsappName}!%20I%27ve%20been%20selected%20as%20part%20of%20the%20giveaway%2C%20my%20coupon%20code%20is%${couponCode.couponCode}`;

 //then create links (branded) --> 

 const newLink = await links.create({
  link: `${couponCode}`, 
  linkRedirectTo: url
 });
 return `${MY_DOMAIN_NAME}/data/${newLink.link}`
}
catch(err){

  logger.error(err);
  console.log(err);
  return res.status(400).send("Sorry! Something went wrong! ");
}
}

// async function buyData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, message, network, type, userState, userStates) {

//   const user = await Users.findOne({ phone: whatsappUserNumber });

//   console.log(DataAvenuePrice_ID);
//   console.log(price);
//   console.log(PatoMobile_data_id)

//   //WhatsappUserNumber 

//   //price is the price for mtn_1gb from the prices.json file. 
//   //PatoMobile_data_id is the data ID. 
//   //phone is the phone no of the buyer. 

//   let result;
//   let getPhoneNo; 


//   do {
//     userState =  'INPUT_PHONE_NO';
//     userStates.set(whatsappUserNumber, userState);

    
//     message.reply("Enter phone number to buy data, Enter it like this: 08166358607 or type 'Cancel' to go back.");
//     const getPhoneNoResponse = new Promise(async (resolve) => {
//       const responseListener = async (responseMessage) => {
//         if (responseMessage.from === message.from) {
//           resolve(responseMessage.body);
//           client.removeListener('message', responseListener);
//         }
//       };
//       client.on('message', responseListener);
//     });
//      getPhoneNo = await getPhoneNoResponse;
//     result = await utils.validateUserPhoneNo(getPhoneNo);
//     if (getPhoneNo.toUpperCase() === 'CANCEL') {
//       userState = 'START'; // Return to the main menu
//       userStates.set(whatsappUserNumber, userState);
//       message.reply("You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
//       return;
//     }
//   }
//    while (result === false);

//    //getInput is the phone number. 

//   //  (whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, message)
//   let checkUserWalletBalance= await checkUserBalance(whatsappUserNumber, price);

//   if (checkUserWalletBalance === false) 
//   { 

//     message.reply(`You have insufficient funds in your wallet to make this transaction, as your wallet balance is only ${user.walletBalance} NGN. Please press 1 to fund your wallet. Thank you!`);

//     userState = "INSUFFICIENT_FUNDS";
//     userStates.set(whatsappUserNumber, userState);
//   } 
//   else {

//     const buyDataResponse = await utils.fetchData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, getPhoneNo, network, type);
//     message.reply(buyDataResponse);
//     userState = "START"
//     userStates.set(whatsappUserNumber, userState);

//   }
  
// }

async function listenForPhoneNo() 
{

let phoneNoEvent  = new eventEmitter;

phoneNoEvent.on("getPhoneNo", (data) => 
{

  validateUserPhoneNo()

})

}

async function isRossyTransactionSuccessful(data) 
{

  //check if data has the responses 
  console.log(data)

  if(data.hasOwnProperty("Status") && data.Status === "successful")
  {
    return true;
  }
  else {
    return false
  }


}

async function isClubKonnectTransactionSuccessful(data)
{


  try {
    if(data.hasProperty("status") && data.status === "ORDER_RECEIVED"){
      return true;
    }
    else {
      return false;
    }

  }
  catch(err) {

    logger.error(err.message)
    console.log(err);
  }

}

async function createNewTransactionAndUpdateUserBalance(whatsappUserNumber, network, price, phoneNumber) 
{

  try{
  const user = await Users.findOne({ phone: whatsappUserNumber });
   let updatedUser = await Users.findOneAndUpdate(
    { phone: whatsappUserNumber },
    { $inc: { walletBalance: -price } }, 
    { new: true });

    const newTransaction = await Transaction.create({
      user_phoneNumber: `${whatsappUserNumber}`,
      amount: price, 
      txntype: "debit",
      details: {
        desc: ` ${network} Data Purchase `,
        amount: `${price}`,
        phoneNumberForData: `${phoneNumber}`
      }

    })
    console.log(updatedUser);
    return updatedUser;
  }
  catch(err) 
  {

  }
  }


module.exports = { generateRandomReferenceID, createUser, checkUserBalance, fetchData, validateUserPhoneNo,generateCouponCodeAndSaveToDb, sendCouponCodeURLToExpBuddy, buyFromRossyTech, isRossyTransactionSuccessful};
