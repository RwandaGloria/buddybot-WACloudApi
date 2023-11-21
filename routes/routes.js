/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const express = require('express');
const app = require('../app');
const User = require('../models/users');

const Router = express.Router();
const user_prompts = require('./user_prompts');

app.post('/my-webhook', async (req, res) => {
  try {
    console.log('Visited!');

    const { body } = req;
    const customer_phone_num = body.data.metadata.phone_no;

    const { chatId } = body.data.metadata;
    console.log(chatId);

    console.log(req.body);
    // paystack writes in kobo
    const nairaAmount = body.data.amount / 100;
    console.log(`nairaAmount is ${nairaAmount}`);

    if (body.event === 'charge.success') {
      const user = await User.findOne({ phone: customer_phone_num });

      console.log(user);
      const { walletBalance } = user;
      const verifyTransactionStatus = await user_prompts.verifyTransaction(body.data.reference);
      console.log(verifyTransactionStatus);
      const TRANSACTION_CHARGE = 50;

      if (verifyTransactionStatus === true) {
        const updatedUser = await User.findOneAndUpdate(
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
        await client.sendMessage(chatId, `You have successfully funded your wallet with ${nairaAmount}. Your wallet Balance is now ${updatedUser.walletBalance} NGN. \n You can proceed with your transactions. 🙌🥳✊🎉  \n 
        a --> Fund wallet \nx
          b --> Buy data \n
          c --> Check wallet balance \n d --> For inquiries/partnerships \n Please enter one of the following options, 1 or 2 or 7`);

        res.send(200);
        userStates.set(customer_phone_num, 'START');
      } else {
        res.send("There's something wrong with payment, sorry, try again! 😔");
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
