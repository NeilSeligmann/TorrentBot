let root			= "../";
let enginesFolder 	= root+'engines/';

let fs 				= require('fs');
let jf 				= require('jsonfile');
let Promise 		= require('promise');
var sequence 		= require('sequence').create();
// let engines 		= require(root+'config/engines');




let engineController = {}

engineController.engineLocation = function(name){
	return enginesFolder+name+"/engine.js";
}

engineController.engineValid = function(name){
	try{
		require(this.engineLocation(name));
		return true;
	}
	catch(err){
		return false;
	}
}

engineController.getEngine = function(name){
	if(this.engineValid(name)){
		let engine = require(this.engineLocation(name));
		return engine;
	}else{
		return "error";
	}
}

engineController.getAllEngines = function(callback){
	let engines = jf.readFileSync('config/engines.json');

	let finalEngines = [];

	let keys = Object.keys(engines);
	for (var i = 0; i < keys.length; i++) {
		let cur_e = engines[keys[i]];

		if(cur_e.enabled){
			finalEngines.push(this.getEngine(cur_e.engine));
		}

		if(i == keys.length-1)
			callback(finalEngines);
	}
}

engineController.registerNewEngines = function(){
	return;
}


module.exports = engineController;