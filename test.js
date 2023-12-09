const phoneNoValidator = require('nigeria-phone-number-validator');

const phone = new phoneNoValidator.validatePhoneNumberSync('09112412130');

console.log(phone);
