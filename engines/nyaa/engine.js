// const NyaaAPI 	= require('nyaa-api-pt');
const {si} = require('nyaapi')

let engine = {};

//Search
//string -> string to search
//Return's Results
//Format:
// { 
//	category: { label: 'Anime - English-translated', code: '1_2' },
//  name: '[HorribleSubs] Hakyuu Houshin Engi - 02 [480p].mkv',
//  links:
//      { page: 'https://nyaa.si/view/997734',
//        file: 'https://nyaa.si/download/997734.torrent',
//        magnet: 'magnet:?xt=urn:btih:KI5EDBGCXWOSUV4ZW5LIELUKEG52COXK&dn=%5BHorribleSubs%5D+Hakyuu+Houshin+Engi+-+02+%5B480p%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce' },
//  fileSize: '146.6 MiB',
//  timestamp: '1516375094',
//  seeders: '137',
//  leechers: '9',
//  nbDownload: '1378' 
// },


engine.search = function (data, callback) {



    // const engOptions = {
    //     'baseUrl': 'https://nyaa.se/', //sukebei.
    //     'timeout': 3 * 1000
    // };

    // const nyaa = new NyaaAPI({ options: engOptions });


	let string = "";
	for (var i = 0; i < data["keywords"].length; i++) {
		string += data["keywords"][i] + " ";
	}

	// string = "princess lover 1080";

	// console.log("Nyaa: " + string);

	si.search(string, 20)
		.then(function(results){
			console.log(results);

			let res_data = [];
			for (let i = 0; i < results.length; i++) {
				let result = {
					"name": 		results[i].name,
					"magnet": 		results[i].links.magnet,
					"downloadURL":  results[i].links.file,
					"description": 	null,
					"uploader": 	null,
					"seeders": 		results[i].seeders,
					"leechers": 	results[i].leechers,
					"size": 		results[i].fileSize,
					"link": 		results[i].links.page,
					"uploadDate": 	results[i].timestamp,
					"category": 	results[i].category["code"],
					"subcategory":	null,
					"id": 			null, 
				}
				res_data.push(result);
			}

			callback(null, res_data);
		}).catch(function(err){
			console.log(err);
			callback(err, null)
		})
}

engine.config = function(){
	return require("./config.json");
}

module.exports = engine;


