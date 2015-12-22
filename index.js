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

  request( url, function( error, response, html ) {

    if ( !error && response.statusCode == 200 ) { // status code 200 means OK

      // and then we want to craft JSON from the info we extract

      res.send(html); // or, instead, just show us the HTML we got for now

    } else if (error) { // if we fail to get a response from the Virginia server
      console.error(error);
    } else { // if the status code of the response is anything other than OK
      console.log(response);
    }

  } );

} );
