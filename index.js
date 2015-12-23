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

      // initialize Cheerio with requested HTML
      var $ = cheerio.load(html); // allows DOM transversal jQuery-style on $

      var $opinions = $('p').slice(2); // get all p elements, discard first two
      $opinions = $opinions.slice(0, $opinions.length - 2); // discard footer

      var jsons = []; // initialize array for collecting all our JSONs

      for ( var p = 0; p < $opinions.length; p += 1 ) {
        var pContent = $opinions.eq(p).text();

        // crafting JSON from the info extracted from each element in $opinions
        // would happen here

        jsons.push({
          content: pContent // let's just push the contents of each p into JSON
        });
      }

      res.json(jsons); // respond with our compilation of JSON

    } else if (error) { // if we fail to get a response from the Virginia server
      console.error(error);
    } else { // if the status code of the response is anything other than OK
      console.log(response);
    }

  } );

} );
