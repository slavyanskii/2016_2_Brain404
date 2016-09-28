exports.post = {
	"tags": ["register"],
	"description": "Метод регистрации нового пользователя",
	"parameters": [
		{
			"name": "login",
			"description": "Имя пользователя",
			"type": "string"
		},
		{
			"name": "password",
			"description": "Пароль",
			"type": "string"
		},
		{
			"name": "email",
			"description": "Email",
			"type": "email"
		}
	],
	"responses": {
		"200": {
			"schema": {
				"description": "Все поля валидные( не пустые и не null )",
			}
		},
		"400": {
			"schema": {
				"description": "Одно или несколько( все) из полей не валидное"
			}
		},
		"409": {
		"schema": {
			"description": "Все поля валидные , но пользователь с таким логином существует"
			}
		}
	},
};

