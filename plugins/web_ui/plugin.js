var config	= require('./config.json');
var express = require('express');
var bodyParser = require('body-parser');
var app 	= express();
var root 	= "./../../";
var index 	= require(root+"app.js");

let plugin = {};

plugin.start = function(eventEmitter){
	console.log("Web UI plugin initialized.");
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/web/index.html');
})

app.post('/search', function (req, res) {
	let str = req.body.string;
	if(typeof(str) == "undefined"){
		res.send();
		return;
	}

	console.log("Search recieved, processing...");

	let sData = {
		"keywords": str.split(" ")
	}

	index.searchTorrents(sData)
		.then(function(results){
			console.log("Results sent.");
			res.send(JSON.stringify(results));
		}).catch(function(err){
			console.log("Error Fetching Results.");
			console.log(err);
		})

	// index.searchTorrents(sData, function(results){
	// 	// console.log(results);
	// 	console.log("Results sent.");
	// 	res.send(JSON.stringify(results));
	// });
})

app.listen(config.port, function () {
  console.log('Web UI listening on port ' + config.port + ".");
})





module.exports = plugin;