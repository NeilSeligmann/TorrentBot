const {si} = require('nyaapi');

si.search("HorribleSubs")
.then((data) => {
	console.log(data)
})
.catch((err) => console.log(err))