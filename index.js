var request = require('request'); // HTTP client - to get input
var express = require('express'); // HTTP server - middle of the action
var cheerio = require('cheerio'); // power up jQuery on the server
var path    = require('path');    // lets us craft absolute URLs when needed

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

      // Initialize Cheerio with requested HTML
      var $ = cheerio.load(html); // allows DOM transversal jQuery-style on $

      var $opinions = $('p').slice(2); // get all p elements, discard first two
      $opinions = $opinions.slice(0, $opinions.length - 2); // discard footer

      var jsons = []; // initialize array for collecting all our JSONs

      for ( var p = 0; p < $opinions.length; p += 1 ) {

        // Grab all text inside p element
        var pContent = $opinions.eq(p).text();

        // Grab text inside b element (bold tags)
        var caseName = $opinions.eq(p).find('b').text();

        // Grab the first word in the text (and assume it's a docket)
        var docketNumber = pContent.trim().split(' ')[0];

        // Split text on line break and assume the second part is summary
        var summary = pContent.split('\n')[1].trim();

        // Split text on line break and assume first part is meta info
        var metaInfo = pContent.split('\n')[0].trim();
        // Grab the last word in meta info and assume it's the date
        var date = metaInfo.split(' ')[metaInfo.split(' ').length - 1];

        // Find all the a elements that have an href attribute
        var $aWithHrefs = $opinions.eq(p).find('a[href]');
        var hrefs = []; // compile the href json in this
        // iterate through all the a[href] elements and extract the link info
        for ( var a = 0; a < $aWithHrefs.length; a += 1 ) {
          hrefs.push({
            name: $aWithHrefs.eq(a).text(),
            href: path.join( path.dirname(url), $aWithHrefs.eq(a).attr('href') )
          });
        }

        jsons.push({
          case_name: caseName,
          docket_number: docketNumber,
          date: date,
          summary: summary,
          hrefs: hrefs,
          // content: pContent // let's just push the contents of each p into JSON
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
