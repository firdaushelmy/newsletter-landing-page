const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAdd = req.body.emailAdd;
  const SERVER_NUMBER = process.env.SERVER_NUMBER;
  const API_KEY = process.env.API_KEY;
  const AUDIENCE_LIST_ID = process.env.AUDIENCE_LIST_ID;

  const data = {
    members: [
      {
        email_address: emailAdd,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = `https://${SERVER_NUMBER}.api.mailchimp.com/3.0/lists/${AUDIENCE_LIST_ID}`;
  const options = {
    method: 'POST',
    auth: `firdausTest:${API_KEY}`
  }

  const request = https.request(url, options, function (response) {
    // success or failure
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    // code to check if json parse status on terminal
    // response.on('data', function (data) {
    //   console.log(JSON.parse(data));
    // });
  });
  request.write(jsonData);
  request.end();
})

app.post('/failure', function (req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function () {
  console.log('server 3000 listening port is running');
});