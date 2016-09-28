exports.post = {
	"tags": ["auth"],
	"description": "Метод авторизации",
	"parameters": [
		{
			"name": "login",
			"description": "Имя пользователя",
			"type": "string"
		},
		{
			"name": "password",
			"description": "Пароль пользователя",
			"type": "string"
		}
	],
	"responses": {
		"200": {
			"schema": {
				"text": "\{login\}",
				"description": "Все поля валидные( не пустые и не null ), и пароль и логин верные ",
			}
		},
		"400": {
			"schema": {
				"description": "Одно или несколько( все) из полей не валидное ",
			}
		},
		"401": {
			"schema": {
				"description": "Все поля валидные , но пароль или логин неверный ",
			}
		}
	},
};

