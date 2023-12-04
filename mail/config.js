/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();
const logger = require('../logger');

const { SMTP_GMAIL_USER } = process.env;
const { SMTP_GMAIL_PASS } = process.env;
const { SMTP_EMAIL_SENDER } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: `${SMTP_GMAIL_USER}`,
    pass: `${SMTP_GMAIL_PASS}`,
  },
});

const HTML_TEMPLATE = async (data) => {
  try {
    const templatePath = path.join(__dirname, '../mail/template.ejs');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const renderedTemplate = await ejs.render(templateContent, data);
    return renderedTemplate;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
async function main(subject, emailContent, recipients) {
  try {
    const dynamicData = {
      dynamicHeading: `Expenditures Buddy - ${subject}`,
      customerName: 'Customer',
      emailContent: `${emailContent}`,
    };

    const htmlContent = await HTML_TEMPLATE(dynamicData);
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `${SMTP_EMAIL_SENDER}`,
      to: `${recipients}`, // list of receivers
      subject: `${subject}`,
      text: '',
      html: htmlContent, // html body
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    logger.error(error);
    console.error(error);
  }
}

module.exports = { main };
