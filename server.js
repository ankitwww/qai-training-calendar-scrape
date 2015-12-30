var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

    //QAI Training Calendar web page
	var url = 'http://www.qaiglobalinstitute.com/calendar/';

	request(url, function(error, response, html){
		var json = [];
		if(!error && html){
			var $ = cheerio.load(html);
			$('tr').each(function(i, tr){
				var children = $(this).children();
				var training  =  $(children[0]).text();
				var course = $(children[1]).text().trim();
				var location = $(children[2]).text();
				var date = $(children[3]).text();
				var price = $(children[4]).text();
				var row = {
					training: training,
					course: course,
					location: location,
					date: date,
					price: price
				};
				json.push(row);
	        });
		} else {
            console.log(error);
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			res.send('Check your console!');
        });
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app; 	