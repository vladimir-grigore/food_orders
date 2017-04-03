require('dotenv').config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const MY_PHONE = process.env.MY_PHONE;

var client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

function call(order_number, order_items){
  let orderItemParamString = order_items.map((item) => `${item.quantity}+${item.name}`.replace(' ', '+')).join(',');
  let orderNumberString = `order+number+${order_number}`;
  let urlString = `https://frozen-everglades-65134.herokuapp.com/?items=${orderNumberString},${orderItemParamString}`;
  client.makeCall({
    url: urlString,
    to: MY_PHONE,
    from: TWILIO_PHONE_NUMBER,
    method: 'GET'
  }, function(err, call) {
    if (err) {
      console.log(err);
    } else {
      console.log(call);
    }
  })
};

function text(minutes) {
  client.messages.create({
    to: MY_PHONE,
    from: TWILIO_PHONE_NUMBER,
    body: 'Your order will take '+ minutes + ' minutes',
  }, function(err, message) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(message));
    }
  });
}

function orderReady(text) {
  client.messages.create({
    to: MY_PHONE,
    from: TWILIO_PHONE_NUMBER,
    body: text
  }, function(err, message) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(message));
    }
  });
}

module.exports = {
  call,
  text,
  orderReady
};
