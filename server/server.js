const path = require('path');
const dotenvPath = path.join(__dirname, '.env');
require('dotenv').config({path: dotenvPath});
const qs = require('qs');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const request = require('request');

/* Create an HTTP server to handle responses */

//create express server
var express = require('express');
var app = express();

const port = 8888;

async function getAuthToken() {
  return new Promise((resolve, reject) => {
    var client_id = CLIENT_ID;
    var client_secret = CLIENT_SECRET;
  
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: {
        grant_type: 'refresh_token',
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(response.body.access_token)
      } else {
        console.log('error: ' + error);
        console.log('response.statusCode: ' + response.statusCode);
        console.log('response.statusText: ' + response.statusText);
        reject(error)
      }
    });
  })
  
}

function getCurrentSong(token) {
  var options = {
    'method': 'GET',
    'url': 'https://api.spotify.com/v1/me/player/currently-playing',
    'headers': {
      'content': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}


app.listen(port, () => {
  console.log(`example app listening at http://localhost:${port}`)
  // promise for getting auth token
  getAuthToken()
    .then((token) => {
      console.log('token: ' + token);
      getCurrentSong(token);
    }).catch((err) => {
      console.log('error: ' + err);
    })
})