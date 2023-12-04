/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const app = require('../app');
const User = require('../models/users');

const Router = express.Router();
const user_prompts = require('./user_prompts');
const links = require('../models/links');
const couponCodes = require('../models/coupon_codes');
const { generateRandomFiveDigitAlphaNumericDigits } = require('../utils');
const rateLimit = require('express-rate-limit');

const { MY_BOT_PHONE_NUMBER } = process.env;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
});
Router.get('/gift/:link', limiter, async (req, res) => {
  const { link } = req.params;
  const findLink = await links.findOne({ link });

  if (!findLink) {
    return res.status(404).send('That link doesn\'t exist');
  }
  if (findLink.isLinkExpired === true) {
    return res.status(404).send('That link has expired');
  } if (findLink.isLinkExpired === false) {
    return res.status(302).redirect(findLink.linkRedirectTo);
  }
  return res.status(500).send('Something went wrong, please try again later!');
});

Router.get('/share/:data/:network', limiter, async (req, res) => {
  const { phoneNo } = req.query;
  const { couponCode } = req.query;
  const { data } = req.params;
  const { network } = req.params;
  const coupon = await couponCodes.findOne({ couponCode });
  if (!coupon) {
    return res.status(404).send('Link has expired!');
  }
  const updateCoupon = await couponCodes.findOneAndUpdate({ couponCode }, { $set: { dataAmount: data, network } });

  if (coupon.isExpired === true) {
    return res.status(404).send('Link has expired!');
  }
  if (coupon.isUsed === true) {
    return res.status(404).send('This Link can only be used once!');
  }
  if (coupon.isUsed === false && coupon.isExpired === false) {
    const URL = `https://api.whatsapp.com/send?phone=${MY_BOT_PHONE_NUMBER}&text=${phoneNo}%20gifted%20me%20some%20data!%20My%20coupon%20code%20is%20${couponCode}`;
    return res.redirect(302, URL);
  }
  return res.status(500).send('Something went wrong, please try again later!');
});

module.exports = Router;
