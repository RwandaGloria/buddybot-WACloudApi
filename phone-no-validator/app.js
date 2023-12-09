const phoneNoValidator  = require('./index');

const check = phoneNoValidator.validatePhoneNumberSync('09132096028');

console.log(check)