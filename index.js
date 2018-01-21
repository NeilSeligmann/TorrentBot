let fs 					= require('fs');
let request 			= require('request');
let utils 				= require('./app/utils.js');
let config 				= require('./config/config.json');


// let dbController		= require('./app/DatabaseController.js');



var events = require('events');
var eventEmitter = new events.EventEmitter();

start();

function start(){
	console.log("App Initialized");
	initializePlugins();
}

function initializePlugins(){
	console.log("Initializing plugins...");
	let plugins = require('./config/plugins.json');

	for (var i = 0; i < Object.keys(plugins).length; i++) {
		let key = Object.keys(plugins)[i];
		let plugin = require("./plugins/"+key+"/plugin.js");
		plugin.start(eventEmitter);

		if(i == Object.keys(plugins).length-1)
			console.log("Plugins have been initialized.");
	}
}