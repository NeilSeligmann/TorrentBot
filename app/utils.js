let args = process.argv.slice(2)

let utils = {}

utils.hasArg = function(value){
	for(let arg of args)
		if(arg === `--${value}`)
			return true

	return false
}


module.exports = utils