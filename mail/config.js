require('dotenv').config();

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { Worker, Queue } = require('bullmq'); // Use `bullmq` instead of `bull`
const logger = require('../logger');

const { SMTP_GMAIL_USER, SMTP_GMAIL_PASS, SMTP_EMAIL_SENDER } = process.env;

const { REDIS_HOST } = process.env;
const { REDIS_PORT } = process.env;
const { REDIS_PASSWORD } = process.env;

const redisOptions = {
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
};
const emailQueue = new Queue('emails', redisOptions);

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

const worker = new Worker('emails', async (job) => {
  try {
    const { to, subject, emailContent } = job.data;
    console.log('Processing job:', job.data);

    const dynamicData = {
      dynamicHeading: `Expenditures Buddy - ${subject}`,
      customerName: 'Customer',
      emailContent: `${emailContent}`,
    };

    const htmlContent = await HTML_TEMPLATE(dynamicData);

    const mailOptions = {
      from: `${SMTP_EMAIL_SENDER}`,
      to: `${to}`,
      subject: `${subject}`,
      text: emailContent,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    logger.error(error);
    console.error(error);
  }
});

emailQueue.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

async function main(subj, emailBody, recipients) {
  try {
    // Add the job to the queue
    await emailQueue.add('emails', {
      to: `${recipients}`,
      subject: `${subj}`,
      emailContent: `${emailBody}`, // Use 'emailContent' instead of 'body'
    });
    console.log('Added to queue');
  } catch (error) {
    logger.error(error);
    console.error(error);
  }
}
module.exports = { main };
