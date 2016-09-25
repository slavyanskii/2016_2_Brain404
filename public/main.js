(function () {
  'use strict';
  if (typeof window === 'object'){

    //import
    let Button = window.Button;
    let ModalForm = window.ModalForm;

    let mainContainer = document.querySelector('.main_container');
    //listener
    let _addListeners = function() {
      console.log('listeners add');
      $('.login').on('click', _showLoginForm);
      $('.register').on('click', _showRegisterForm);
    }
    //events
    function _showLoginForm() {
      $('.modal_login').modal('show');

    };
    function _showRegisterForm() {
      $('.modal_register').modal('show');

    };

    //elements
    let buttons = new Button({
      el: document.createElement('div'),
      classAttrs: ['ui', 'large', 'buttons'],
    });

    let buttonLogin = new Button({
      el: document.createElement('button'),
      classAttrs: ['ui', 'button', 'login'],
      text: 'Логин'
    });

    let buttonOr = new Button({
      el: document.createElement('div'),
      classAttrs: ['or']
    });

    let buttonRegister = new Button({
      el: document.createElement('button'),
      classAttrs: ['ui', 'button', 'register'],
      text: 'Регистрация'
    });

    let formLogin = new ModalForm({
      el: document.createElement('div'),
      classAttrs: ['ui', 'modal', 'modal_login'],
      data: {
        title: 'Логин',
        fields: [
          {
            label: 'Логин',
            type: 'text',
            name: 'login',
            required: 'required',
          },
          {
            label: 'Пароль',
            type: 'password',
            name: 'password',
            required: 'required',
          },
        ],
      },
    });

    let formRegister = new ModalForm({
      el: document.createElement('div'),
      classAttrs: ['ui', 'modal', 'modal_register'],
      data: {
        title: 'Регистрация',
        fields: [
          {
            label: 'Email',
            type: 'text',
            name: 'email',
            required: 'required',
          },
          {
            label: 'Логин',
            type: 'text',
            name: 'login',
            required: 'required',
          },
          {
            label: 'Пароль',
            type: 'password',
            name: 'password',
            required: 'required',
          },
          {
            label: 'Пароль ещё раз',
            type: 'password',
            name: 'passwordRepeat',
            required: 'required',
          },
        ],
      },
    });

    mainContainer.appendChild(buttons.el);
    buttons.el.appendChild(buttonLogin.el);
    buttons.el.appendChild(buttonOr.el);
    buttons.el.appendChild(buttonRegister.el);
    mainContainer.appendChild(formLogin.el);
    mainContainer.appendChild(formRegister.el);
    _addListeners();
  }
  // let userData = {};
  // const filter = (str, rules = ['kek', 'hek']) => {
  //   rules.forEach(rule => {
  //     const star = '*';
  //     const stars = star.repeat(rule.length);
  //     const rgx = new RegExp('\\b' + rule + '\\b', 'gi');
  //     str = str.replace(rgx, stars);
  //   });
  //   return str;
  // };
  //
  // function plural(num) {
  //   const end = num % 10;
  //   if ((end > 1 && end < 5) && !(num > 10 && num < 14)) {
  //     return ' раза!';
  //   }
  //   return ' раз!';
  // }
  //
  // function hello() {
  //   form.hidden = false;
  //   window.helloWorld.innerHTML = helloText(data.user, result);
  //   console.log(data, result, plural(result));
  // }
  //
  // if (typeof exports === 'object') { // for NodeJS
  //   exports.hello = hello;
  //   exports.filter = filter;
  //   exports.helloText = helloText;
  //   exports.plural = plural;
  // } else {
  // }
})();
