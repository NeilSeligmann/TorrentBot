var dbController 	= require("./controllers/DatabaseController.js");

let plugin = {}

plugin.start = function(){
	console.log("Series plugin started.");
	dbController.buildSchema();
};

module.exports = plugin;