/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const cron = require('node-cron');
const db = require('../db');
const utils = require('../utils');
const links = require('../models/links');
const couponCodes = require('../models/coupon_codes');
const logger = require('../logger');

require('dotenv').config();


