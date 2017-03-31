
const TWILIO_ACCOUNT_SID = "AC6c7fd74c3c714733757ebc58b5467e1d"
const TWILIO_AUTH_TOKEN = "184dc77eca57cdb98e0607425e5a3751"
const TWILIO_PHONE_NUMBER = "+17786519857"
const BASSIM = "+17788881940"


//require the Twilio module and create a REST client
var client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.makeCall({
  url: 'https://demo.twilio.com/docs/voice.xml',
  to: BASSIM,
  from: TWILIO_PHONE_NUMBER,
  method: 'GET'
  // mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
}, function(err, call) {
  if (err) {
    console.log(err);
  } else {
    console.log(call);
  }
});
