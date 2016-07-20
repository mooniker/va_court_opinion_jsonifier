# JSONifier for Virginia Supreme Court slip opinion abstracts

This script, which was written to accompany [a tutorial on web scraping with Node.js](https://gist.github.com/mooniker/d5852ff5abb6f62e8967), extracts Virginia Supreme Court slip opinion information from the high court's webpage and convert the data to JSON.

Target webpage: [http://www.courts.state.va.us/scndex.htm](http://www.courts.state.va.us/scndex.htm) (Supreme Court of Virginia Opinions)

The script uses `request` to get the webpage and `cheerio` (jQuery for the backend) to parse the response. The JSON produced, an array of objects for each case, looks something like this:

```json
{  
   case_name:"Small v. Commonwealth",
   docket_number:"150965",
   date:"07/14/2016",
   summary:"The circuit court did not err in denying a motion to withdraw a guilty plea almost three years after it was made. Prejudice to the Commonwealth is a relevant factor that should be considered when reviewing a motion to withdraw a guilty plea, and in this case it cannot be said that the trial court erred by weighing the equities and considering the resulting prejudice to the Commonwealth due to the lengthy delay between the defendant's entry of his guilty plea and his motion to withdraw that plea. Nor can it be said that the trial court abused its discretion in finding that the prejudice to the Commonwealth outweighed any equities that favored granting the motion. Further, the defendant did not demonstrate an immediate, real threat to his safety, and thus did not have a defense of necessity to a charge of possession of a firearm after having been convicted of a felony. The judgment of the Court of Appeals, upholding the judgment of the circuit court, is affirmed.",
   hrefs:[  
      {  
         name:" 150965",
         href:"http:/www.courts.state.va.us/opinions/opnscvwp/1150965.pdf"
      }
   ]
}
```


