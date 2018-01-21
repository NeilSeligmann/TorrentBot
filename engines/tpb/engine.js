const PirateBay = require('thepiratebay');
let jf 			= require('jsonfile');

let engine = {};

//Search
//string -> string to search
//Return's Results
//Format:
/*
[
  {
    name: 'Game of Thrones (2014)(dvd5) Season 4 DVD 1 SAM TBS',
    size: '4.17 GiB',
    link: 'http://thepiratebay.se/torrent/10013794/Game_of_Thron...'
    category: { id: '200', name: 'Video' },
    seeders: '125',
    leechers: '552',
    uploadDate: 'Today 00:57',
    magnetLink: 'magnet:?xt=urn:btih:4e6a2304fed5841c04b16d61a0ba...
    subcategory: { id: '202', name: 'Movies DVDR' }
  },
  ...
]
*/

engine.search = function(data, callback){
	let string = "";
	for (var i = 0; i < data["keywords"].length; i++) {
		string += data["keywords"][i] + " ";
	}

	// console.log("String: " + string);

	PirateBay.search(string, {
		orderBy: 'seeds',
    	sortBy: 'desc'
	})
	.then(function(results){
		let res_data = [];
		// console.log(results);
		// console.log("Found " + results.length + " results.");


		for (let i = 0; i < results.length; i++) {
			let result = {
				"name": 		results[i].name,
				"magnet": 		results[i].magnetLink,
				"downloadURL":  null,
				"description": 	null,
				"uploader": 	results[i].uploader,
				"seeders": 		results[i].seeders,
				"leechers": 	results[i].leechers,
				"size": 		results[i].size,
				"link": 		results[i].link,
				"uploadDate": 	results[i].uploadDate,
				"category": 	results[i].category["name"],
				"subcategory":	results[i].subcategory["name"],
				"id": 			results[i].id, 
			}
			res_data.push(result);
		}
		callback(null, res_data);
	})
	.catch(err => console.log(err))
}

engine.config = function(){
	return require("./config.json");
}

module.exports = engine;


