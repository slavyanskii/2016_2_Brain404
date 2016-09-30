(function () {
  'use strict';

  if (typeof window === 'object'){

    //import
    let Button = window.Button;
    let ModalForm = window.ModalForm;
    let Message = window.Message;

    let mainContainer = document.querySelector('.main_container');

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
      el: document.createElement('dialog'),
      form: 'login',
      classAttrs: ['ui', 'modal_login'],
      data: {
        title: 'Логин',
        controls: [
          {
            text: 'Войти',
            classAttrs: ['ui', 'button', 'login_submit', 'form_button'],
            attrs : [
              {
              type: 'submit'
              }
            ],
          },
          {
            text: 'Сбросить',
            classAttrs: ['ui', 'button', 'login_reset', 'form_button'],
            attrs : [
              {
              type: 'reset'
              }
            ],
          },
        ],
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
      el: document.createElement('dialog'),
      form: 'register',
      classAttrs: ['ui', 'modal_register'],
      data: {
        title: 'Регистрация',
        controls: [
          {
            text: 'Зарегистрироваться',
            classAttrs: ['ui', 'button', 'registe_submit', 'form_button'],
            attrs : [
              {
              type: 'submit'
              }
            ],
          },
          {
            text: 'Сбросить',
            classAttrs: ['ui', 'button', 'register_reset', 'form_button'],
            attrs : [
              {
              type: 'reset'
              }
            ],
          },
        ],
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

    function _createMess(status, header, text) {
      let newMess = new Message({
        el: document.createElement('div'),
        classAttrs: ['ui', status, 'message'],
      });
      let head = new Message({
        el: document.createElement('div'),
        classAttrs: ['header'],
        text: header
      });
      let content = new Message({
        el: document.createElement('p'),
        text: text
      });
      newMess.el.appendChild(head.el);
      newMess.el.appendChild(content.el);
      return newMess;
    }

    function _hideMess() {
      let messError = document.querySelector('div.error.message');
      let messSuccess = document.querySelector('div.success.message');
      if( messError != null){
        messError.remove();
      }
      if( messSuccess != null){
        messSuccess.remove();
      }
    }

    //listener
    let _addListeners = function() {
      document.querySelector('.close_icon_login').addEventListener('click', event => {
        formLogin.el.close();
        _resetForm(formLogin.form);
      });
      document.querySelector('.close_icon_register').addEventListener('click', event => {
        formRegister.el.close();
        _resetForm(formRegister.form);
      });
      buttonLogin.el.addEventListener('click', event => {
        formLogin.el.showModal();
      });
      buttonRegister.el.addEventListener('click', event => {
        formRegister.el.showModal();
      });
      formLogin.el.addEventListener('submit', _submitLogin);
      formLogin.el.addEventListener('reset', event => {
        _resetForm(formLogin.form);
      });
      formRegister.el.addEventListener('submit', _submitRegister);
      formRegister.el.addEventListener('reset', event => {
        _resetForm(formRegister.form);
      });
    }

    //events
    function _submitLogin(event) {
      event.preventDefault();
      _hideMess();
      let formData = formLogin.getFormData();
      let empty = tryEmptyField(formLogin, formData);
      if (empty.length != 0) {
        let mess = _createMess('error', 'Заполни пустые поля!', '');
        formLogin.el.appendChild(mess.el);
      } else {
        _sendRequest('/auth', formData, formLogin, 'login');
      }
    }

    function _submitRegister(event) {
      event.preventDefault();
      _hideMess();
      let formData = formRegister.getFormData();
      let empty = tryEmptyField(formRegister, formData);
      let valid = tryValidate(formRegister, formData);
      if ( valid ) {
        let mess = _createMess('error', 'Заполни форму правильно!', valid);
        formRegister.el.appendChild(mess.el);
      } else {
        _sendRequest('/registration', formData, formRegister, 'register');
      }

    }

    function _resetForm(form){
      let el = document.querySelector('form.'+form);
      _hideMess();
      el.reset();
      let mess = document.querySelector('div.error.message');
      if( mess != null){
        mess.remove();
      }
      let errors = Array.from(document.getElementsByClassName('error'));
      errors.forEach( element => {
        element.classList.remove('error');
      });
    }

    //requests

    function _sendRequest(to, data, form, clas) {
      document.querySelector('form.'+clas).classList.add('loading');
      let jsonData = JSON.stringify(data);
      let initPomise = {
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      };
      let base_url = 'https://maze-backend.herokuapp.com/api',
          url = base_url + to;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          document.querySelector('form.'+clas).classList.remove('loading');
          if (xhttp.status != 200) {
            let mess = _createMess('error', xhttp.status, xhttp.responseText);
            form.el.appendChild(mess.el);
            Object.keys(data).forEach( field => {
              form.el.querySelector('input[name=' + field + ']').parentNode.classList.add('error');
            });
          } else {
            let mess = _createMess('success', xhttp.status, xhttp.responseText);
            form.el.appendChild(mess.el);
          }
        }
      };
      xhttp.ontimeout = function() {
        let mess = _createMess('error', 'Превышен таймаут!');
        form.el.appendChild(mess.el);
      }
      xhttp.open('POST', url, true);
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.timeout = 15000;
      xhttp.send(jsonData);

    }

    //validate form
    function tryEmptyField(form, formData) {
      let errors = [];
      let lastErrors = Array.from(document.getElementsByClassName('error'));
      lastErrors.forEach( element => {
        element.classList.remove('error');
      });
      Object.keys(formData).forEach( field => {
        if (formData[field] == false){
          errors.push(field)
        }
      });
      errors.forEach(field => {
        form.el.querySelector('input[name=' + field + ']').parentNode.classList.add('error');
      })
      return errors;
    }

    function validateEmail(field) {
        let apos = field.indexOf('@');
        let dotpos = field.lastIndexOf('.');
        if (apos<1||dotpos-apos<2){
            return false;
        }
        else {
            return true;
      }
    }

    function validateUsername(fld) {
        let error = '',
            illegalChars = /\W/; // allow letters, numbers, and underscores
        if ((fld.length < 5) || (fld.length > 15)) {
            error += 'Username от 5 до 15 символов!';
        } else if (illegalChars.test(fld)) {
            error += 'Username только буквы, цифры, нижн.подчеркивание!';
        }
        return error;
      }

    function validatePassword(fld, fld2) {
        let error = '',
            illegalChars = /[\W_]/; // allow only letters and numbers

        if ((fld.length < 6) || (fld.length > 15)) {
            error += 'Пароль от 6 до 15 символов!';
        }
        if (illegalChars.test(fld)) {
            error += 'Пароль только цифры и буквы!';
        }
        if (fld != fld2){
            error += 'Повтори пароль правильно!'
        }
        return error;
    }

    function tryValidate(form, formData){
      let errorMess = '';
      if (!validateEmail(formData.email)) {
        form.el.querySelector('input[name=email]').parentNode.classList.add('error');
        errorMess += 'Заполни правильно Email!';
      }
      let userValid = validateUsername(formData.login);
      if (userValid) {
        form.el.querySelector('input[name=login]').parentNode.classList.add('error');
        errorMess += userValid;
      }
      let passValid = validatePassword(formData.password, formData.passwordRepeat);
      if (passValid) {
        form.el.querySelector('input[name=password]').parentNode.classList.add('error');
        form.el.querySelector('input[name=passwordRepeat]').parentNode.classList.add('error');
        errorMess += passValid;
      }
      return errorMess;
    }

    mainContainer.appendChild(buttons.el);
    buttons.el.appendChild(buttonLogin.el);
    buttons.el.appendChild(buttonOr.el);
    buttons.el.appendChild(buttonRegister.el);
    mainContainer.appendChild(formLogin.el);
    mainContainer.appendChild(formRegister.el);
    _addListeners();
  }

  const filter = (str, rules = ['kek', 'hek']) => {
    rules.forEach(rule => {
      const star = '*';
      const stars = star.repeat(rule.length);
      const rgx = new RegExp('\\b' + rule + '\\b', 'gi');
      str = str.replace(rgx, stars);
    });
    return str;
  };

  function plural(num) {
    const end = num % 10;
    if ((end > 1 && end < 5) && !(num > 10 && num < 14)) {
      return 'раза!';
    }
    return 'раз!';
  }

  if (typeof exports === 'object') {
    // for NodeJS
    exports.plural = plural;
<<<<<<< HEAD
  }
=======
  }
>>>>>>> a9d1c306d38420129a6f9e4f9e5803e99ef3b4ae
})();
