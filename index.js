var request = require('request'); // HTTP client - to get input
var express = require('express'); // HTTP server - middle of the action
var cheerio = require('cheerio'); // power up jQuery on the server

var app = express(); // initialize our web application's server

app.listen( 4000, function() {
  console.log('Hit up port 4000 to start the action.');
} );
