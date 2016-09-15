'use strict';

let userData = {};

function filter (str, rules = ['КЕК', 'hek']) {
	let pos = 0;
	for (let i = 0; i < rules.length; ++i ){
		let stars = '*';
		let rule = rules[i];
		stars = stars.repeat(rules[i].length);
		str = str.replace("/\b"+rules[i]+"\b/", stars);
		// str = str.replace(new RegExp(rule,'g'), stars);
		console.log(str);
	}
	return str;
}

function onLogin (form, block) {
	userData = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	 jsLogin.hidden = true;
	 jsChat.hidden = false;

	 if (userData.user) {
		 userData.user = filter(userData.user);
		 jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
	 }

	 subscribe();
}

function createMessage (opts, isMy = false) {
	let message = document.createElement('div');
	let email = document.createElement('div');

	message.classList.add('chat__message');
	email.classList.add('chat__email');
	if (isMy) {
		message.classList.add('chat__message_my');
	} else {
		message.style.backgroundColor = `#${technolibs.colorHash(opts.email || '')}`;
	}
	message.innerHTML = opts.message;
	email.innerHTML = opts.email;
	message.appendChild(email);


	return message;
}

function onChat (form) {
	let data = {
		message: form.elements['message'].value,
		email: userData.email
	};

	let result = technolibs.request('/api/messages', data);
	form.reset();
}

function renderChat (items) {
	jsMessages.innerHTML = '';
	items.forEach(item => {
		let message = createMessage(item, item.email === userData.email);
		jsMessages.appendChild(message);
	});
	jsMessages.scrollTop = jsMessages.scrollHeight;
}

function subscribe () {
	technolibs.onMessage(data => {
		renderChat(Object.keys(data).map(key => data[key]));
	});
}

function hello(text) {
	form.hidden = false;
	window.helloWorld.innerHTML = helloText(data.user, result);
	console.log(data, result , plural(result));
}

function helloText (text, num) {
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
	exports.filter = filter;
	exports.plural = plural;
}
