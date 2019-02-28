require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your order has been processed and will be ready in <number> minutes',
     from: '+16477244390',
     to: process.env.MY_PHONE_NUMBER,
   })
  .then(message => console.log(message.sid));


client.messages
  .create({
    body: 'A new order has been placed! See <link> for details',
    from: '+16477244390',
    to: process.env.MY_PHONE_NUMBER,
  })
  .then(message => console.log(message.sid));