let fs 					= require('fs');
let config 				= require('./config/config.json');

// CONTROLLERS
let engineController 	= require('./app/EngineController.js');

let app = {};


// let sData = {
// 	"keywords": ["fairy", "tail"]
// }

// searchAll(sData, function(search_results){
// 	console.log(search_results);
	
// });

// data = {
// 	keywords = ["key1", "key2", "key3", ...],
// 	customData1= "",
// 	customData2="",
// }




app.searchTorrents = function (data){
	return new Promise(function(resolve, reject) {
		if(typeof(data) == "undefined" || !data)
			reject("Invalid Search Data");
			// data["keywords"] = ["Arrow"]; //, "s01e01", "eztv"

			// let results = [];

			engineController.getAllEngines(function(engines){
				let all_results = [];
				let engines_finished = 0;

				engines.forEach(function(eng, idx, engines_array){
					let eng_results = {
						"info":{
							"name": eng.config().name
						},
						"results": [],
					};

					eng.search(data, function(err, res_data){
						if(err){
							console.log("ERROR: " + err);
							console.log(eng.config()["name"]+" finished with an error.");
						}
						else
							console.log(eng.config()["name"]+" done, found " + res_data.length + " results.");

						// if()
						if(res_data == null || res_data.length == 0){
							engines_finished++;
							if(engines_finished == engines_array.length){
								console.log("Finished, last engine with 0 results");
								// callback(all_results);
								resolve(all_results);
							}
						}else{
							for(let i in res_data){
								let r = res_data[i];
								eng_results["results"].push(r);

								if(i == res_data.length-1){
									// console.log("Finished.");
									engines_finished++;
									all_results.push(eng_results)

									if(engines_finished == engines_array.length){
										console.log("Finished.");
										// callback(all_results);
										resolve(all_results);
									}
								}
							}
						}
					});
				});
			});
		
	});
}


module.exports = app;