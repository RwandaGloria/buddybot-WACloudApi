const func = require('./utils');

async function getResult() {
  const result = await func.validateUserPhoneNoNetwork('08166358607', 2, '04');
  console.log(result.message);
}
getResult();
