(function () {
  'use strict';
  let userData = {};

  const filter = (str, rules = ['kek', 'hek']) => {
    rules.forEach(rule => {
      const star = '*';
      const stars = star.repeat(rule.length);
      const rgx = new RegExp(`\\b, ${rule}, \\b, gi`);
      str = str.replace(rgx, stars);
    });
    return str;
  };

  function plural(num) {
    const end = num % 10;
    if ((end > 1 && end < 5) && !(num > 10 && num < 14)) {
      return ' раза!';
    }
    return ' раз!';
  }

  function createMessage(opts, isMy = false) {
    const message = document.createElement('div');
    const email = document.createElement('div');

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

  function renderChat(items) {
    jsMessages.innerHTML = '';
    items.forEach(item => {
      const message = createMessage(item, item.email === userData.email);
      jsMessages.appendChild(message);
    });
    jsMessages.scrollTop = jsMessages.scrollHeight;
  }

  function subscribe() {
    technolibs.onMessage(data => {
      renderChat(Object.keys(data).map(key => data[key]));
    });
  }

  function onLogin(form, block) {
    userData = {
      user: form.elements.user.value,
      email: form.elements.email.value,
    };

    jsLogin.hidden = true;
    jsChat.hidden = false;

    if (userData.user) {
      userData.user = filter(userData.user);
      jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
    }

    subscribe();
  }

  function helloText(text, num) {
    return `Привет, ${text}, ты был тут, ${num},  ${plural(num)}`;
  }

  function onChat(form) {
    const data = {
      message: form.elements.message.value,
      email: userData.email,
    };

    const result = technolibs.request('/api/messages', data);
    form.reset();
  }

  function hello() {
    form.hidden = false;
    window.helloWorld.innerHTML = helloText(data.user, result);
    console.log(data, result, plural(result));
  }

  if (typeof exports === 'object') { // for NodeJS
    exports.hello = hello;
    exports.filter = filter;
  } else {
    window.onLogin = onLogin;
    window.onChat = onChat;
  }
})();
