const test = require('nigeria-phone-number-validator');

const result1 = test.validatePhoneNumberSync('08166358607');
console.log(result1.telco);
const obj = {
  '01': 'MTN',
  '02': 'GLO',
  '03': '9MOBILE',
  '04': 'AIRTEL',
};

console.log(result1.telco === obj['01']);
