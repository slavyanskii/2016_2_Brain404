module.exports =  {
	"type": "object",
	"description":  "Авторизация " ,

	"properties": {
		"login": {
			"description": "Логин ",
			"type": "string",
			"minLength": 6,
 			"maxLength": 50
		},
		"password": {
			"description": "Пароль",
			"type": "string",
			"minLength": 2,
 			"maxLength": 140
		},
	},

	"required": ["login", "password"]
};
