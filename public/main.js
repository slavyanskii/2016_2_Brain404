'use strict';
/**
* @see http://artsiom.mezin.eu/technofront/
*/
function onSubmit (form) {
	let data = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	let result = request('/users', data);

	form.hidden = false;
	window.helloWorld.innerHTML = hello(data.user, result);

	console.log(data, result , plural(result));
}

function hello (text, num) {
	return 'Привет, ' + text + ', ты был тут ' + num + plural(num);
}

function plural(num) {
	let end = num % 10;
	if ((end > 1 && end < 5) && !(num > 10 && num < 14)) {
		return ' раза!';
	} else {
		return ' раз!';
	}
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.plural = plural;
}
