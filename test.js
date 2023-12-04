const url = require('url');

const newUrl = 'https://6f69-102-91-69-194.ngrok-free.app/share?phoneNo=2348166358607&couponCode=lW3Ccma98EjHTMjMUD*3iZxJTE£YPB';

const parsedUrl = url.parse(newUrl);

let couponCode;
const queryParams = new URLSearchParams(parsedUrl.search);

console.log(queryParams.get('couponCode'));
