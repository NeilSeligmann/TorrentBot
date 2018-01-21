let config 	= require('../config/config.json');
let knex 	= require('knex')(config.knex);


let databaseController = {}

databaseController.buildSchema = function(){
	console.log("Checking if table already exists...");
	let series = config.schemas.series;
	knex.schema.createTableIfNotExists(series.table, function (table) {
        // Autoincrementing ID
        table.increments();

        // Name
        table.string(series.columns.name);

        // Season
        table.integer(series.columns.season);

        // Episode
        table.integer(series.columns.episode);

        // Description
        table.format(series.columns.format);

        console.log("Table Created for first time.");
    }).then(function () {
    	console.log("TEST");
    });
};




module.exports = databaseController;