/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const axios = require('axios');
const eventEmitter = require('events');
const { PhoneNumberUtil } = require('google-libphonenumber');
// const NigerianPhone = require('validate_nigerian_phone');
const crypto = require('crypto');
const validator = require('email-validator');
const phoneNoValidator = require('nigeria-phone-number-validator');
const db = require('./db');
const Users = require('./models/users');
const logger = require('./logger');
const Transaction = require('./models/transactions');
const transaction = require('./models/transactions');
const couponCodes = require('./models/coupon_codes');
const links = require('./models/links');
const mail = require('./mail/config');

require('dotenv').config();

const { PATOMOBILE_API_KEY } = process.env;
const { PATOMOBILE_ID } = process.env;
const { DATAAVE_API_KEY } = process.env;
const { PHONE_NO_WHATSAPP_MSG } = process.env;
const { MY_DOMAIN_NAME } = process.env;
const { ROSSYTECH_API_KEY } = process.env;
const { USER_ADMIN_EMAIL_ADDDR } = process.env;

const messageTemplate = 'Please press 1 to enter fund wallet\nPress 2 to Buy Data\nPress 3 to make inquiries or to make a bot for your business.';

async function createUser(user_phone_no, name, userType) {
  try {
    let user = await Users.findOne({ phone: user_phone_no });
    if (user === null) {
      const newUser = new Users({
        phone: user_phone_no, walletBalance: 0, name, userType: 'regular',
      });
      await newUser.save();
      user = newUser;
    }
    return `Welcome to Expenditures Buddy!\nYou have ${user.walletBalance} in your wallet balance\n${messageTemplate}`;
  } catch (err) {
    logger.log({ level: 'warn', message: `Unable to create user: ${err}\nAt ${Date.now}` });
    return err.message;
  }
}

async function buyCGData(whatsappUserNumber, phoneNoForData, ROSSY_CG_DATA_ID, ROSSY_NETWORK_ID, CLUBKONECT_MOBILE_NETWORK_CODE, CLUBKONECT_CG_DATA_ID, CG_DATA_PRICE, CG_DATA_AMOUNT, userState, userStates) {
  // eslint-disable-next-line no-param-reassign
  userState = 'BUYING_CG_DATA';
  userStates.set(whatsappUserNumber, userState);

  const rossyData = await buyFromRossyTech(ROSSY_NETWORK_ID, phoneNoForData, ROSSY_CG_DATA_ID);
  const isRossySuccessful = await isRossyTransactionSuccessful(rossyData);

  if (isRossySuccessful === false) {
    const clubKonectResponse = await clubKonect(phoneNoForData, CLUBKONECT_CG_DATA_ID, CLUBKONECT_MOBILE_NETWORK_CODE);
    console.log(`Clubkonect code is ${CLUBKONECT_MOBILE_NETWORK_CODE}`);
    const isTransactionSuccessful = isClubKonnectTransactionSuccessful(clubKonectResponse.data);

    if (isTransactionSuccessful === false) {
      return 'Data currently unavailable. Please try again later. We are sorry for the inconvenience. \n\n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance';
    }

    return ` ${clubKonectResponse.productname} ${clubKonectResponse.mobilenetwork} Data sent to ${phoneNoForData} ! Check data balance. Your new wallet balance is ${updatedUser.walletBalance} NGN. \n\nYou can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;
  }
  let updatedUser = await Users.findOneAndUpdate(
    { phone: whatsappUserNumber },
    { $inc: { walletBalance: -price } },
    { new: true },
  );

  const newTransaction = await Transaction.create({
    user_phoneNumber: whatsappUserNumber,
    amount: price,
    txntype: 'debit',
    details: {
      desc: ` ${CLUBKONECT_MOBILE_NETWORK_CODE} Data Purchase `,
      amount: `${CG_DATA_AMOUNT}`,
      phoneNumberForData: `${phoneNoForData}`,
    },
  });
  return ` ${rossyData.plan_name} ${rossyData.plan_network} Data sent to ${phoneNoForData} ! Check data balance. Your new wallet balance is ${updatedUser.walletBalance} NGN. \n\nYou can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;
}
async function buyFromPatoMobile(PATOMOBILE_ID, phoneNumber, network, type, PatoMobile_data_id) {
  try {
    const patoMobileApiUrl = 'https://patomobile.com/wp-content/plugins/vprest/';
    const { PATOMOBILE_API_KEY } = process.env;

    // const patoMobileApiUrl = `https://patomobile.com/wp-content/plugins/vprest/?id=${PATOMOBILE_ID}&apikey=${PATOMOBILE_API_KEY}&q=data&phone=${phoneNumber}&network=airtel&type=${type}&dataplan=${PatoMobile_data_id}`;

    const queryParams = {
      id: `${PATOMOBILE_ID}`,
      apikey: `${PATOMOBILE_API_KEY}`,
      q: 'data',
      phone: phoneNumber,
      network: `${network}`,
      type: `${type}`,
      dataplan: `${PatoMobile_data_id}`,
    };

    console.log({
      type,
      phoneNumber,
      dataplan: PatoMobile_data_id,
      network,
    });
    const PatoMobileResponse = await axios.get(patoMobileApiUrl, { params: queryParams });
    const stringedData = JSON.stringify(PatoMobileResponse.data, null, 2);
    console.log(network);

    let updatedUser;

    const JSONData = PatoMobileResponse.data;
    return JSONData;
  } catch (err) {
    logger.error(err.message);
    console.log(err);
    return err.message;
  }
}

async function fetchData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, phoneNumber, network, type, ROSSY_NETWORK_ID, ROSSY_PLAN_ID, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE) {
  try {
    const user = await Users.findOne({ phone: whatsappUserNumber });
    const checkUserWalletBalance = await checkUserBalance(user.walletBalance, price);

    if (!checkUserWalletBalance) {
      return `You have insufficient funds in your wallet to make this transaction, as your wallet balance is only ${user.walletBalance} NGN. \n\n Please enter 'a' to fund your wallet.`;
    }

    const rossyResponse = await buyFromRossyTech(ROSSY_NETWORK_ID, phoneNumber, ROSSY_PLAN_ID);
    const checkIfRossyTransactionIsSuccessful = await isRossyTransactionSuccessful(rossyResponse);

    if (checkIfRossyTransactionIsSuccessful) {
      await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } },
        { new: true },
      );

      return `${rossyResponse.plan_network} ${rossyResponse.plan_name} Data sent successfully to ${phoneNumber} \n\n Your new wallet balance is ${user.walletBalance - price} NGN. \n\nYou can enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;
    }
    const clubKonectResponse = await clubKonect(phoneNumber, CLUBKONNECT_DATAPLAN, CLUBKONECT_MOBILE_NETWORK_CODE);
    const result = isClubKonnectTransactionSuccessful(clubKonectResponse);

    if (result === true) {
      await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } },
        { new: true },
      );
    } else if (result === false) {
      return 'Sorry, we are unable to process your request at this time. Please try again later. \n\n You can enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance';
    } else {
      console.log(result);
    }
  } catch (err) {
    console.log(err);
    logger.error(err.message);
    return 'Sorry, we are unable to process your request at this time. Please try again later. \n\n You can enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance';
  }
}

async function clubKonect(phoneNoForPurchase, CLUBKONECT_DATA_PLAN, CLUBKONECT_MOBILE_NETWORK_CODE) {
  try {
    const { CLUBKONECT_API_KEY } = process.env;
    const { CLUBKONECT_USER_ID } = process.env;
    const url = `https://www.nellobytesystems.com/APIDatabundleV1.asp?UserID=${CLUBKONECT_USER_ID}&APIKey=${CLUBKONECT_API_KEY}&MobileNetwork=${CLUBKONECT_MOBILE_NETWORK_CODE}&DataPlan=${CLUBKONECT_DATA_PLAN}&MobileNumber=${phoneNoForPurchase}`;
    const response = await axios.post(url);
    const responseData = response.data;
    console.log(response.data);
    return responseData;
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Error in ClubKonnect: ${err}`,
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
      Ported_number: true,
    };

    console.log(data);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://rossytechs.com/api/data/',
      headers: {
        Authorization: `Token ${ROSSYTECH_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data,
    };

    const response = await axios(config); // Use 'await' to make the Axios call

    return response.data;
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Error connecting to RossyTech: ${err} ....${err.message}`,
    });

    return err.message;
  }
}

async function validateUserPhoneNoNetwork(phonenumber, ROSSY_NETWORK_CODE, CLUBKONECT_MOBILE_NETWORK_CODE) {
  const phone = new phoneNoValidator.validatePhoneNumberSync(phonenumber);
  const network = phone.telco;

  const obj = {
    '01': 'MTN',
    '02': 'GLO',
    '03': '9MOBILE',
    '04': 'AIRTEL',
  };
  if (CLUBKONECT_MOBILE_NETWORK_CODE) {
    if (network === obj[CLUBKONECT_MOBILE_NETWORK_CODE]) {
      return {
        status: true,
      };
    }
    return {
      status: false,
      message: `Sorry, this number is an ${network} number. Please enter a valid ${obj[CLUBKONECT_MOBILE_NETWORK_CODE]} number`,
    };
  }
}
async function validateUserPhoneNo(number, CLUBKONECT_MOBILE_NETWORK_CODE) {
  try {
    const regexPattern = /^0\d{10}$/;

    const isNigerianNumber = regexPattern.test(number);

    if (!isNigerianNumber) {
      console.log('INvalid regex pattern!');
      return {
        status: false,
      };
    }
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumber = `${number}`;
    const result = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber, 'NG'));

    if (result === false) {
      return {
        status: false, message: 'Please enter a valid Nigerian phone number, like this, 08166358607',
      };
    }
    const phone = new NigerianPhone(number);
    const network = phone.getNetwork().toUpperCase();
    const obj = {
      '01': 'MTN',
      '02': 'GLO',
      '03': '9MOBILE',
      '04': 'AIRTEL',
    };
    if (CLUBKONECT_MOBILE_NETWORK_CODE) {
      if (network === obj[CLUBKONECT_MOBILE_NETWORK_CODE]) {
        return {
          status: true,
        };
      }
      return {
        status: false,
        message: `Sorry this number is not valid, This number is a ${network} number. Please enter a valid ${obj[CLUBKONECT_MOBILE_NETWORK_CODE]} number 👇`,
      };
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function buyDataFromDataAvenue(DataAvenuePrice_ID, phoneNumber, price, whatsappUserNumber, network) {
  console.log(whatsappUserNumber);
  const user = await Users.findOne({ phone: whatsappUserNumber });
  console.log(user);

  const { DATAAVE_API_KEY } = process.env;

  const apiUrl = `https://dataavenue.ng/api/v2/datashare/?api_key=${DATAAVE_API_KEY}&product_code=${DataAvenuePrice_ID}&phone=${phoneNumber}&callback=https://dataavenue.ng/webhook.php`;

  const response = await axios.post(apiUrl);
  const confirmTransaction = response.data;

  console.log(`confirmTransaction is ${confirmTransaction.error_code}`);
  const error_code = (confirmTransaction.error_code).toString();

  if (error_code === '1982') {
    return ('Im really sorry! There is a problem with our data servers now. Can you please try again later :( \n\n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance');
  }

  if (error_code === '1978') {
    return 'Im really sorry, it seems we are having some problems with our servers. Please check back; we are sorry for the inconvenience, and we would never want to be intentionally unable to provide you with constant data supply.   \n You can Enter in any of the following:   \n\n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance';
  }

  if (error_code === '1983') {
    logger.error({ message: 'Kindly update your data avenue wallet please!' });
    return 'Can you please try again in an hour please. I\'m really sorry!.  \n You can Enter in any of the following:   \n\n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance';
  }

  if (error_code === '1986') {
    const dataTransactionID = response.data.data.recharge_id;
    const confirmTransactionResponse = await axios.get(
      `https://dataavenue.ng/api/v2/datashare/?api_key=${DATAAVE_API_KEY}&order_id=${dataTransactionID}&task=check_status`,
    );

    if (confirmTransactionResponse.data.text_status === 'COMPLETED' || confirmTransactionResponse.data.data.text_status === 'COMPLETED') {
      const updatedUser = await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: -price } },
        { new: true },
      );

      const newTransaction = await Transaction.create({
        user_phoneNumber: `${whatsappUserNumber}`,
        amount: price,
        txntype: 'debit',
        details: {
          desc: ` ${network} Data Purchase `,
          amount: `${price}`,
          phoneNumberForData: `${phoneNumber}`,
        },
      });

      return `NGN ${price} Data sent successfully to ${phoneNumber}! Check data balance. Your new wallet balance is ${updatedUser.walletBalance} NGN. \n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;
    }

    const updatedUser = await Users.findOneAndUpdate(
      { phone: whatsappUserNumber },
      { $inc: { walletBalance: -price } },
      { new: true },
    );

    const newTransaction = await Transaction.create({
      user_phoneNumber: whatsappUserNumber,
      amount: price,
      txntype: 'debit',
      details: {
        desc: ` ${network} Data Purchase `,
        amount: `${price}`,
        phoneNumberForData: `${phoneNumber}`,
      },
    });

    return `You would soon receive the data, please check your balance, it is still processing. The data has been sent to ${phoneNumber}! Check data balance. Your new wallet balance is ${updatedUser.walletBalance} NGN. \n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance`;
  }
  return 'Sorry, it seems something is wrong with our data providers. Please again later. \n You can Enter in any of the following:   \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance';
}

async function checkUserBalance(walletBalance, amount) {
  // const user = await Users.findOne({ phone: whatsappUserNumber.toString() });

  if (walletBalance >= amount) {
    return true;
  }

  return false;
}

function generateRandomReferenceID() {
  const randomID = Math.floor(1000000 + Math.random() * 9000000);
  return randomID.toString();
}

async function listenForPhoneNo() {
  // eslint-disable-next-line new-cap
  const phoneNoEvent = new eventEmitter();

  phoneNoEvent.on('getPhoneNo', (data) => {
    validateUserPhoneNo();
  });
}

async function isRossyTransactionSuccessful(data) {
  console.log(data);
  if (data.balance_after) {
    const balanceAfter = parseFloat(data.balance_after);
    if (balanceAfter <= 1000) {
      try {
        await mail.main(`Rossy Balance below 1000 - NGN ${balanceAfter}`, `Your Rossy Balance is below NGN 1000 - NGN ${balanceAfter} \n Please update your balance. \n\n`, `${USER_ADMIN_EMAIL_ADDDR}`);
      } catch (err) {
        console.error('Failed to send mail:', err);
      }
    }
  }
  if (data.hasOwnProperty('Status') && data.Status === 'successful') {
    try {
      await mail.main(`Rossy Transaction Successful - NGN ${data.amount} to ${data.mobile_number}`, `Your Rossy Transaction was successful - NGN ${data.plan_amount} \n\n`, `${USER_ADMIN_EMAIL_ADDDR}`);
    } catch (err) {
      console.error('Failed to send mail:', err);
    }
    return true;
  }
  try {
    await mail.main(`Rossy Transaction Failed - NGN ${data.amount} to ${data.mobile_number}`, `Your Rossy Transaction Failed - NGN ${data.amount} \n\n`, `${USER_ADMIN_EMAIL_ADDDR}`);
  } catch (err) {
    console.error('Failed to send mail:', err);
  }
  return false;
}

async function isClubKonnectTransactionSuccessful(data) {
  try {
    if (data.hasOwnProperty('status') && data.status === 'ORDER_RECEIVED') {
      return true;
    }

    return false;
  } catch (err) {
    logger.error(err.message);
    console.log(err);
  }
}

async function createNewTransactionAndUpdateUserBalance(whatsappUserNumber, network, price, phoneNumber) {
  try {
    const user = await Users.findOne({ phone: whatsappUserNumber });
    const updatedUser = await Users.findOneAndUpdate(
      { phone: whatsappUserNumber },
      { $inc: { walletBalance: -price } },
      { new: true },
    );

    const newTransaction = await Transaction.create({
      user_phoneNumber: `${whatsappUserNumber}`,
      amount: price,
      txntype: 'debit',
      details: {
        desc: ` ${network} Data Purchase `,
        amount: `${price}`,
        phoneNumberForData: `${phoneNumber}`,
      },

    });
    console.log(updatedUser);
    return updatedUser;
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
}

async function userWalletBalance(phoneNo) {
  try {
    const user = await Users.findOne({ phone: phoneNo });
    return user.walletBalance;
  } catch (err) {
    console.error(err);
    logger.error(err.message);
    return 'Unable to check user wallet balance!';
  }
}
async function ifUserCanCreateLink(numOfLinks, amount, walletBalance) {
  const intNumOfLinks = parseInt(numOfLinks, 10);
  const totalAmountToSpend = intNumOfLinks * amount;

  console.log(`totalAmountToSpend is ${totalAmountToSpend}`);
  console.log(amount);
  if (walletBalance >= totalAmountToSpend) {
    return true;
  }
  return false;
}

async function generateRandomFiveDigitAlphaNumericDigits() {
  const length = 5;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomBytes(1)[0] % characters.length;
    result += characters.charAt(randomIndex);
  }

  return result;
}
// So basically store  random five digit alphanumeric digits in an array.

async function generateLinkShortener(URL) {
  const link = await generateRandomFiveDigitAlphaNumericDigits();
  return {
    link,
    linkRedirectTo: URL,
  };
}
async function generateCouponCode() {
  const length = 30;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-+*£';
  let couponCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomBytes(1)[0] % characters.length;
    couponCode += characters.charAt(randomIndex);
  }
  return couponCode;
}

async function storeCouponsToArray(phoneNo, amount, numOfLinks) {
  const promises = Array(numOfLinks).fill().map(async () => {
    const couponCode = await generateCouponCode();
    return {
      couponCode,
      senderPhoneNo: phoneNo,
      amount,
    };
  });

  return await Promise.all(promises);
}

async function saveCouponToDb(coupons) {
  try {
    const newCoupons = await couponCodes.insertMany(coupons);
    return newCoupons;
  } catch (err) {
    console.error(err);
  }
}
async function generateAndSaveLinks(data, network, coupons) {
  const URLS = [];
  const promises = coupons.map(async (coupon) => {
    const URL = `${MY_DOMAIN_NAME}/share/${data}/${network}?phoneNo=${coupon.senderPhoneNo}&couponCode=${coupon.couponCode}`;
    const generatedURL = await generateLinkShortener(URL);
    return generatedURL;
  });
  const linksArr = await Promise.all(promises);
  const newLinks = await links.insertMany(linksArr);
  newLinks.forEach((link) => {
    URLS.push(`${MY_DOMAIN_NAME}/gift/${link.link}`);
  });
  return URLS;
}
async function deductAmountFromUserWalletBalance(amount, whatsappUserNumber) {
  const user = await Users.findOne({ phone: whatsappUserNumber });
  const amountFloat = parseFloat(amount);
  console.log(`amount is ${amount}`);

  if (user) {
    const updateUserWalletBalance = await Users.findOneAndUpdate(
      { phone: whatsappUserNumber },
      { $inc: { walletBalance: -amountFloat } },
      { new: true },
    );
    return {
      status: true,
      balance: updateUserWalletBalance.walletBalance,
    };
  }

  return {
    status: false,
  };
}

async function sendToUser() {

  // send mail ---->

}
async function addAmountToUserWalletBalance(amount, whatsappUserNumber) {
  try {
    const user = await Users.findOne({ phone: whatsappUserNumber });
    const amountFloat = parseFloat(amount);
    console.log(`amount is ${amount}`);
    if (user) {
      const updateUserWalletBalance = await Users.findOneAndUpdate(
        { phone: whatsappUserNumber },
        { $inc: { walletBalance: amountFloat } },
        { new: true },
      );
      return {
        status: true,
        balance: updateUserWalletBalance.walletBalance,
      };
    }
    return {
      status: false,
    };
  } catch (err) {
    logger.error(`Error in the addAmount Wallet: ${err.message}`);
    return err.message;
  }
}

async function findLink(couponCode) {
  try {
    const escapedCouponCode = couponCode.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const findLink = await links.findOne({ linkRedirectTo: { $regex: escapedCouponCode, $options: 'i' } });
    // const findLink = await links.findOne({ link: { $regex: `.*${couponCode}.*`, $options: 'i' } });
    return findLink.link;
  } catch (err) {
    logger.error(`Error in finding link: ${err.message}`);
    console.error(err);
  }
}

async function updateCoupon(couponCode, whatsappUserNumber) {
  try {
    const updateCoupon = await couponCodes.findOneAndUpdate({ couponCode: `${couponCode}` }, { isUsed: true, isExpired: true, usedBy: `${whatsappUserNumber}` }, { new: true });
  } catch (err) {
    logger.error(`Error in updating coupon: ${err.message}`);
    console.error(err);
  }
}

async function findCouponSenderByPhoneNo(senderPhoneNo) {
  try {
    const user = await Users.findOne({ phone: `${senderPhoneNo}` });
    return user;
  } catch (err) {
    logger.error(`Error in finding coupon sender by phone no: ${err.message}`);
    console.error(err);
  }
}

async function findCoupon(coupon, senderPhoneNo) {
  try {
    const findCoupon = await couponCodes.findOne({ couponCode: `${coupon}`, senderPhoneNo: `${senderPhoneNo}` });
    return findCoupon;
  } catch (err) {
    logger.error(`Error in finding coupon: ${err.message}`);
    console.error(err);
    return 'An error occured! No vex! Please try again later. ';
  }
}

async function validateEmail(email) {
  try {
    const isValidated = await validator.validate(`${email}`); // true
    return isValidated;
  } catch (err) {
    logger.error(`Error in validating email: ${err.message}`);
    console.error(err);
    return false;
  }
}

async function updateUserAndAddEmail(whatsappUserNumber, email) {
  try {
    const user = await Users.findOneAndUpdate({ phone: whatsappUserNumber }, { $set: { email: `${email}` } }, { new: true });
    return true;
  } catch (err) {
    return false;
  }
}
// This converts a string to a URL, which then allows it to be parsed and coupon code extracted.

module.exports = {
  generateRandomReferenceID, createUser, checkUserBalance, fetchData, validateUserPhoneNo, buyFromRossyTech, isRossyTransactionSuccessful, buyCGData, clubKonect, validateUserPhoneNoNetwork, userWalletBalance, ifUserCanCreateLink, generateLinkShortener, generateRandomFiveDigitAlphaNumericDigits, generateAndSaveLinks, saveCouponToDb, storeCouponsToArray, generateCouponCode, addAmountToUserWalletBalance, deductAmountFromUserWalletBalance, findLink, updateCoupon, findCouponSenderByPhoneNo, findCoupon, validateEmail, updateUserAndAddEmail,
};
