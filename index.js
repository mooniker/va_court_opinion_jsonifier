var request = require('request'); // HTTP client - to get input
var express = require('express'); // HTTP server - middle of the action
var cheerio = require('cheerio'); // power up jQuery on the server

var app = express(); // initialize our web application's server

app.listen( 4000, function() {
  console.log('Hit up port 4000 to start the action.');
} );

app.get( '/scrape', function( req, res ) {

  // target for our scraping, opinions from Virginia's highest state court
  var url = 'http://www.courts.state.va.us/scndex.htm';

  console.log('Scraping target:', url);

  // here we want to request the webpage at the given url

  // and then we want to craft JSON from the info we extract

} );
