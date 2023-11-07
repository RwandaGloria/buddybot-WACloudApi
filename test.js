     let checkUserType =  await Users.findOne({ phone: whatsappUserNumber });

        switch (userState) {

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
                console.log(typeof(userState))
                console.log(typeof(userInput))
                userStates.set(whatsappUserNumber, userState);
                await bot.sendText(msg.from, "Which network would you like to purchase your data in?\nPress a for MTN\nPress b for Airtel\nPress c for Glo\nPress d for 9mobile or type 'Cancel' to go back");
              }
              else if(userInput.toUpperCase() === "C") 
              {
                const user = await Users.findOne({ phone: whatsappUserNumber });
                await bot.sendText(msg.from, `You have NGN ${user.walletBalance}  in your wallet balance.\n\n Enter "Cancel" to go back to the main menu!`);
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                 break;
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
            case "INPUT_DATA_2_ANOTHER_USER": 
            await bot.sendText(msg.from, "How many links do you need created?: \n\n Please take note that if you're creating 10 links, you can send to 10 different persons and they will be able to buy data from any network which will be deducted from your wallet balance, \n\n Each link you create has an expiry of 1 day, if they don't claim the data. It would expire and they cannot claim the data anymore. ");
            userState = "ENTER_LINKS";
            userStates.set(whatsappUserNumber, userState);
            break;
            case "ENTER_LINKS": 
  
            const linksNumber = new decimal(userInput);
  
            const User = await Users.findOne({ phone: whatsappUserNumber.toString() });
            
            const userWalletBalance = new decimal(User.walletBalance);
  
            const MIN_AMOUNT_USER_SHOULD_HAVE = 
            new decimal(linksNumber.times(nin_mobile_1gb));
  
            if(userWalletBalance < MIN_AMOUNT_USER_SHOULD_HAVE)
            {
  
              userState = "START"
              userStates.set(whatsappUserNumber, userState);
            }
            else
            {
              await bot.sendText(msg.from, "What data amount would you like to send to the user(s)?\n\n a. 1gb data --> For ALL NETWORKS.\n b. 2gb data --> For ALL NETWORKS.\n c. 5gb data -->For ALL NETWORKS.\n d. 10gb data -->For ALL NETWORKS. \n\nTake note that if you select 1gb data, it is for all networks (GLO, MTN, AIRTEL, 9MOBILE), they will receive 1gb of any of those networks and it will be deducted from your wallet balance  when they claim the data \n Type Cancel to go back to main menu")
  
            if(userInput.toUpperCase() === "A") 
            {
              inputDataToSend = "1gb"
            await bot.sendText(msg.from, "How many links do you need created?: \n\n Please take note that if you're creating 10 links, you are creating 10 links --> if they ");
  
            url = `?data=1gb?phoneNo=${whatsappUserNumber}`;
  
            }
            else if(userInput.toUpperCase() === "B")
            {
  
                url = `?data=1gb?phoneNo=${whatsappUserNumber}`;
            }
            else if(userInput.toUpperCase() === "C")
            {
  
            }
          }
          break;
            case "INPUT_PHONE_NO": 
            console.log(userState);
            break;
            case "CHECK_WALLET_BALANCE": 
            const user = await Users.findOne({ phone: whatsappUserNumber });
            await bot.sendText(msg.from, `You have NGN ${user.walletBalance}  in your wallet balance.  \n\n Enter "Cancel" to go back to the main menu`);
              userState = 'START'; // Return to the main menu
              userStates.set(whatsappUserNumber, userState);
            
             break;
            case 'FUND_WALLET':
              const amount = parseFloat(userInput);
              if (!isNaN(amount)) {
  
                if((amount < 100)) 
                {
                  await bot.sendText(msg.from, "Sorry, funding almost is too low. Amount must be more than N 100. Please input to try again! \nTo go back, enter Cancel");
                
                }
                else {
  
                await bot.sendText(msg.from, `You can make payment using the link be, no signup needed. Please also take note that funding requires N50 ⬇️\n\n  You are paying NGN ${amount} and will receive NGN ${amount - 50} in your wallet balance ⬇️ \n\n` + await user_prompts.fundingWallet(amount, `${user_prompts.generateRandomEmail()}`, whatsappUserNumber, msg.from) + "\n\n To go back to the main menu --> Simply enter Cancel");
                // Clear the user's state
                }
              }
               else if (userInput.toUpperCase() === 'CANCEL') {
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userStates);
                await bot.sendText(msg.from, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
              } else {
                await bot.sendText(msg.from, "Enter a valid amount, e.g., 10000 or type 'Cancel' to go back");
              }
              break;
            case "CHOOSE_NETWORK":
            switch(userInput) {

                case "A": 
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

                userState = 'CHOOSE_MTN_PLAN'; // Return to the main menu
                userStates.set(whatsappUserNumber, userStates);
                
                  break; 
                  case "B": 
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

        break; 
        case "C" : 
      
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
        break;

        case "D": 
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

          break;

          case "CANCEL" : 
         
            userState = 'START'; // Return to the main menu
            userStates.set(whatsappUserNumber, userState);
            await bot.sendText(msg.from, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
          break; 
          default:
    
            await bot.sendText(msg.from, "Invalid Option \n Which network would you like to purchase your data in?\nPress a for MTN\nPress b for Airtel\nPress c for Glo\nPress d for 9mobile or type 'Cancel' to go back to main menu");
            break;
        }
        break;
            case "CHOOSE_GLO_PLAN": 
              switch(userInput.toUpperCase()
              ){
                case "A": 
                userState  = "INPUT_PHONE_NO";
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_500mb_30days", glo_500mb_business, 122, msg, "glo", "corporate");
      
                }else {
                  await buyData(whatsappUserNumber,  "glo_cg_500mb_30days", glo_500mb, 122, msg, "glo", "corporate");
                }
                userState = 'START'; 
                userStates.set(whatsappUserNumber, userState);
                break;
                case "B": 
                userState  = "INPUT_PHONE_NO";
      
                  checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                 if(checkUserType.userType === "business") 
                 {
                   await buyData(whatsappUserNumber,  "glo_cg_500mb_30days", glo_1gb_business, 122, msg, "glo", "corporate");
       
                 }else {
                  await buyData(whatsappUserNumber,  "glo_cg_1gb_30days", glo_1gb, 123, msg,"glo");
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
                case "C": 
      
                userState  = "INPUT_PHONE_NO";
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_500mb_30days", glo_2gb_business, 122, msg, "glo", "corporate")
      
                }
                else {
                 await buyData(whatsappUserNumber,  "glo_cg_1gb_30days", glo_2gb, 123, msg,"glo");
               }
               userState = 'START'; // Return to the main menu
               userStates.set(whatsappUserNumber, userState);
                break;
                
                case "D": 
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                userState  = "INPUT_PHONE_NO";
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_3gb_business, 125, msg, "glo", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_3gb, 125, msg, "glo", "corporate");
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
                case "E": 
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                userState  = "INPUT_PHONE_NO";
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_5gb_business, 125, msg, "glo", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_5gb_30days", glo_5gb, 126, msg, "glo", "corporate");
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
                case "F": 
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                userState  = "INPUT_PHONE_NO";
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_3gb_30days", glo_10gb_business, 125, msg, "glo", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "glo_cg_10gb_30days", glo_10gb, 127, msg, "glo", "corporate");
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
                case 'CANCEL':
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  await bot.sendText(msg.from, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
                  break;
                default:
                if(!(userState === "FUND_WALLET" || userState === "INPUT_PHONE_NO") ) 
                {
                  console.log(userState);
                  await bot.sendText(msg.from, "Invalid option. Please enter A, B, C, D, E, F, or G or type 'CANCEL' to go back");
                  break;
                }
              }
              break;
            case "CHOOSE_9mobile_PLAN":
              switch(userInput.toUpperCase()){
      
                case "A": 
                userState  = "INPUT_PHONE_NO";
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_1gb", nin_mobile_1gb_business, 23, msg, "9mobile", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_1gb", nin_mobile_1gb, 23, msg, "9mobile", "corporate");
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
                case "B": 
                userState  = "INPUT_PHONE_NO";
      
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_2gb", nin_mobile_2gb_business, 25, msg, "9mobile", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_2gb", nin_mobile_2gb, 25, msg, "9mobile", "corporate");
      
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
      
                case "C": 
                userState  = "INPUT_PHONE_NO";
                 checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_3gb", nin_mobile_3gb_business, 26, msg, "9mobile", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_3gb", nin_mobile_3gb, 26, msg, "9mobile", "corporate");
                }
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break;
                case "D": 
                userState  = "INPUT_PHONE_NO";
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_5gb", nin_mobile_5gb_business, 27, msg, "9mobile", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_5gb", nin_mobile_5gb, 27, msg, "9mobile", "corporate");
                }   
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);      
                break; 
                case "E": 
                userState  = "INPUT_PHONE_NO";
                 checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_10gb", nin_mobile_10gb_business, 28, msg, "glo", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "9mobile_sme_10gb", nin_mobile_10gb, 28, msg, "glo", "corporate");
                }    
                userState = 'START'; // Return to the main menu
                userStates.set(whatsappUserNumber, userState);
                break; 
                case 'CANCEL':
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  await bot.sendText(msg.from, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
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
            case "CHOOSE_AIRTEL_PLAN": 
              switch(userInput.toUpperCase()){
                case "A": 
                userState  = "INPUT_PHONE_NO";
                  checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "airtel_1gb_30days", airtel_1gb_business, 100, msg, "airtel", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "airtel_1gb_30days", airtel_1gb, 100, msg, "airtel", "corporate");
                }  
                break;
                case "B": 
                userState  = "INPUT_PHONE_NO";
      
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "airtel_2gb_30days", airtel_2gb_business, 101, msg, "airtel", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "airtel_2gb_30days", airtel_2gb, 101, msg, "airtel", "corporate");
                }  
                break;
                
                case "C": 
                 checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                userState  = "INPUT_PHONE_NO";
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "airtel_5gb_30days", airtel_5gb_business, 102, msg, "airtel", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "airtel_5gb_30days", airtel_5gb, 102, msg, "airtel", "corporate");
                }  
                break;
      
  
                case "D": 
                checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                userState  = "INPUT_PHONE_NO";
                if(checkUserType.userType === "business") 
                {
                  await buyData(whatsappUserNumber,  "airtel_10gb_30days", airtel_10gb_business, 103, msg, "airtel", "corporate");
                }
                else 
                {
                  await buyData(whatsappUserNumber,  "airtel_10gb_30days", airtel_10gb, 103, msg, "airtel", "corporate");
                }  
                break;
                case 'CANCEL':
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  await bot.sendText(msg.from, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
                  break;
                default:
                if(!(userState === "FUND_WALLET" || userState === "INPUT_PHONE_NO") ) 
                {
                  console.log(userState);
                  await bot.sendText(msg.from, "Invalid option. Please enter A, B, C, D, E, F, or G or type 'CANCEL' to go back");
                  break;
                }
              }
              break;
            case 'CHOOSE_MTN_PLAN':        
              switch (userInput.toUpperCase()) {
                case 'A':
                   checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                  userState = "INPUT_PHONE_NO";
                //   userStates.set(whatsappUserNumber, )
                  if(checkUserType.userType === "business") 
                  {
                    await buyData(whatsappUserNumber,  "data_share_500mb", mtn_500mb_business, 1, msg, "mtn", "sme");
                  }
                  else 
                  {
                    await buyData(whatsappUserNumber,  "data_share_500mb", mtn_500mb, 1, msg, "mtn", "sme");
                  }  
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  break;
                  case 'B':
                     checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                    userState = "INPUT_PHONE_NO";
      
                    if(checkUserType.userType === "business") 
                    {
                      await buyData(whatsappUserNumber,  "data_share_1gb", mtn_1gb_business, 2, msg, "mtn", "sme");
                    }
                    else 
                    {
                      await buyData(whatsappUserNumber,  "data_share_1gb", mtn_1gb, 2, msg, "mtn", "sme");
                    }  
                    userState = 'START'; // Return to the main menu
                    userStates.set(whatsappUserNumber, userState);
                    break;
                case 'C':
                  checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
                  userState = "INPUT_PHONE_NO";    
                  if(checkUserType.userType === "business") 
                  {
                    await buyData (whatsappUserNumber, "data_share_2gb", mtn_2gb, 3, msg, "mtn", "sme");
                  }
                  else 
                  {
                    await buyData (whatsappUserNumber, "data_share_2gb", mtn_2gb_business, 3, msg, "mtn", "sme");
                  }  
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  break;
      
                case 'D':
                  userState = "INPUT_PHONE_NO";
                  checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                  if(checkUserType.userType === "business") 
                  {
                    await buyData(whatsappUserNumber, "data_share_3gb", mtn_3gb_business, 4, msg, "mtn", "sme");
                  }
                  else 
                  {
                    await buyData(whatsappUserNumber, "data_share_3gb", mtn_3gb, 4, msg, "mtn", "sme");
                  }  
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  break;
                case 'E':
                  userState = "INPUT_PHONE_NO";
                  checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                  if(checkUserType.userType === "business") 
                  {
                    await buyData(whatsappUserNumber, "data_share_5gb", mtn_5gb_business, 5, msg, "mtn", "sme");
                  }
                  else 
                  {
                    await buyData(whatsappUserNumber, "data_share_5gb", mtn_5gb, 5, msg, "mtn", "sme");
                  }  
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  break;
                case 'F':
                  userState = "INPUT_PHONE_NO";
                  checkUserType =  await Users.findOne({ phone: whatsappUserNumber });
      
                  if(checkUserType.userType === "business") 
                  {
                    await buyData(whatsappUserNumber, "data_share_10gb", mtn_10gb_business, 6, msg, "mtn", "sme");
                  }
                  else 
                  {
                    await buyData(whatsappUserNumber, "data_share_10gb", mtn_10gb, 6, msg, "mtn", "sme");
                  }  
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  break;
                case 'CANCEL':
                  userState = 'START'; // Return to the main menu
                  userStates.set(whatsappUserNumber, userState);
                  await bot.sendText(msg.from, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
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
            case 'INSUFFICIENT_FUNDS':
        if (userInput === '1') {
          // Allow the user to fund their wallet
          userState = 'FUND_WALLET';
          userStates.set(whatsappUserNumber, userState);
          await bot.sendText(msg.from, "Enter the amount you would like to fund your wallet with, \n\n Please note that funding requires N50. ⬇️ Type 'Cancel' to go back: ");
        } else if (userInput.toUpperCase() === 'CANCEL') {
          // Cancel the transaction and return to the main menu
          userState = 'START';
          userStates.set(whatsappUserNumber, userState);
          await bot.sendText(msg.from, "You have returned to the main menu.  \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquirires/partnerships");
        } 
        else { 
          userState = 'START';
          userStates.set(whatsappUserNumber, userState);
        }
        break;
            default:
                console.log(`${userState} is`);
                console.log(userStates);
              // Handle the initial state or unrecognized input
              userState = "START";
              userStates.set(whatsappUserNumber, userState);
              break;
          }


          async function buyData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, network, type, userInput) {

            const user = await Users.findOne({ phone: whatsappUserNumber });
      
      
            if (userInput === null) 
            {
                const data = getTextMessageInput(whatsappUserNumber, "Enter phone number to buy data, Enter it like this: 08166358607 or type 'Cancel' to go back");
                await sendMessage(data);
      
      
      
            }
      
            else {
      
             const validate = await utils.validateUserPhoneNo(whatsappUserNumber);
      
             if(validate) 
             {
              
              const data = getTextMessageInput(whatsappUserNumber, "Okay not null again! ");
              await sendMessage(data);
             }
             else 
             {
              const data = getTextMessageInput(whatsappUserNumber, "Enter correct phone number");
              await sendMessage(data);
              userInput = null;
             }
      
            }
            
      
            
      
            // while (!validInput) {
            //   const data = getTextMessageInput(whatsappUserNumber, "Enter phone number to buy data, Enter it like this: 08166358607 or type 'Cancel' to go back");
            //   await sendMessage(data);
      
            //   setTimeout(() => 
            //   {
      
                
            //   }, 6000)
          
            //   const validate = await utils.validateUserPhoneNo(userInput);
          
            //   if (validate) {
            //     validInput = true;
            //   } else {
            //     // Handle invalid input, you can send a message to inform the user and continue the loop.
            //     const errorMessage = "Invalid phone number format. Please try again or type 'Cancel' to go back";
            //     const errorData = getTextMessageInput(whatsappUserNumber, errorMessage);
            //     await sendMessage(errorData);
            //   }
            // }
      
      
      
      
          //  do  
          //  {
      
          //   let result, data;
          //   // let userState = 'INPUT_PHONE_NO';
          //   // userStates.set(whatsappUserNumber, userState);
          
          //   // Send a message to collect the phone number
          //   data = getTextMessageInput(whatsappUserNumber, "Enter phone number to buy data, Enter it like this: 08166358607 or type 'Cancel' to go back");
          //   await sendMessage(data);
          //   console.log(userInput);
          
          //   if (userInput.toUpperCase() === 'CANCEL') {
      
          //     userState = 'START'; // Return to the main menu
          //     userStates.set(whatsappUserNumber, userState);
          //     data = getTextMessageInput(whatsappUserNumber, "You have returned to the main menu. \n a --> Fund wallet \n b --> Buy data \n c --> Check wallet balance \n d --> For inquiries/partnerships");
          //     await sendMessage(data);
          //   }
          //    else {
          //     result = await utils.validateUserPhoneNo(userInput);
          //     console.log(result);
          //     if (result === false) 
          //     {
          //       data = getTextMessageInput(whatsappUserNumber, "Invalid phone number format. Please try again or type 'Cancel' to go back");
          //       await sendMessage(data);
          //       userInput = null;
      
          //     }
          //      else {
          //       // Proceed to check user wallet balance
          //       let checkUserWalletBalance = await utils.checkUserBalance(whatsappUserNumber, price);
          //       if (checkUserWalletBalance === false) 
          //       {
      
          //         data = getTextMessageInput(whatsappUserNumber, `You have insufficient funds in your wallet to make this transaction, as your wallet balance is only ${user.walletBalance} NGN. Please press 1 to fund your wallet. Thank you!`);
          //         await sendMessage(data);
          //         userState = "INSUFFICIENT_FUNDS";
          //         userStates.set(whatsappUserNumber, userState);
      
          //       } 
          //       else {
          //         const buyDataResponse = await utils.fetchData(whatsappUserNumber, DataAvenuePrice_ID, price, PatoMobile_data_id, userInput, network, type);
          //         sendMessage(whatsappUserNumber, buyDataResponse);
          //         userState = "START";
          //         userStates.set(whatsappUserNumber, userState);
          //       }
          //     }
          //   }
          //  }
          //  while(userInput === null)
      
      
          }