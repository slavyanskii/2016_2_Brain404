module.exports = {
	"swagger": "2.0",
	"info": {
		"version": "1.0",
		"title": "Maze API",
		"description": "Maze"
	},
	"basePath": "/api",
	"schemes": ["http"],
   	"host": "http://localhost:3000",

	paths: {
		'/auth': require('./resources/auth'),
		'/register': require('./resources/register')
	},

	definitions: {
		Auth: require('./scheme/Auth'),
		Register: require('./scheme/Register'),
	}

}
