module.exports =  {
	"type": "object",
	"description": "Регистрация",

	"properties": {
		"login": {
			"description": "Login",
			"type": "login",
			"minLength": 6,
 			"maxLength": 50
		},
		"password": {
			"description": "Password",
			"type": "string",
			"minLength": 6,
 			"maxLength": 15
		},
		"email": {
			"description": "Email",
			"type": "email",
			"minLenght": 4
		}
	},

	"required": ["login", "password", "email"]
};
