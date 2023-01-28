require('dotenv').config({path: './.env'});
const qs = require('qs');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/* Create an HTTP server to handle responses */

//create express server
var express = require('express');
var app = express();

const port = 8888;

function getAuthToken() {
  const axios = require('axios');

  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  const redirectUri = 'YOUR_REDIRECT_URI';

  //conver CLIENT_ID and CLIENT_SECRET to base64
  const base64 = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
  
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + base64,
      'Content-Type': 'application/json'
    },
    form: qs.stringify({
      grant_type: 'authorization_code',
      code: 'AUTHORIZATION_CODE',
      redirect_uri: REDIRECT_URI
    }),
    json: true
  };
  
  axios.post(authOptions.url, authOptions)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    });  
}

app.listen(port, () => {
  console.log(`example app listening at http://localhost:${port}`)
  getAuthToken();
})