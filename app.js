const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const emailAdd = req.body.emailAdd

  var data = {
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
  url = `https://us${SERVER_NUMBER}.api.mailchimp.com/3.0/lists/${AUDIENCE_LIST_ID}`;
  const options = {
    method: 'POST',
    auth: `firdausTest:${API_KEY}`
  }

  const request = https.request(url, options, function (response) {
    response.on('data', function (data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})


app.listen(3000, function () {
  console.log('server 3000 listening port is running');
});