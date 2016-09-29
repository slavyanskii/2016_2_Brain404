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
            classAttrs: ['ui', 'button', 'login_submit'],
            attrs : [
              {
              type: 'submit'
              }
            ],
          },
          {
            text: 'Сбросить',
            classAttrs: ['ui', 'button', 'login_reset', 'float_right'],
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
            classAttrs: ['ui', 'button', 'registe_submit'],
            attrs : [
              {
              type: 'submit'
              }
            ],
          },
          {
            text: 'Сбросить',
            classAttrs: ['ui', 'button', 'register_reset', 'float_right'],
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
      console.log('add listeners');
      buttonLogin.el.addEventListener('click', event => {
        formLogin.el.showModal();
      });
      buttonRegister.el.addEventListener('click', event => {
        formRegister.el.showModal();
      });
      formLogin.el.addEventListener('submit', _submitLogin);
      formLogin.el.addEventListener('reset', event => {
        // event.preventDefault();
        _resetForm(formLogin.form);
      });
      formRegister.el.addEventListener('submit', _submitRegister);
      formRegister.el.addEventListener('reset', event => {
        // event.preventDefault();
        _resetForm(formRegister.form);
      });
    }
    //events
    function _submitLogin(event) {
      event.preventDefault();
      console.log('subm login');
      let mess = document.querySelector('div.error.message');
      if( mess != null){
        mess.remove();
      }
      let formData = formLogin.getFormData();
      let empty = tryEmptyField(formLogin, formData);
      if (empty.length != 0) {
        let newMess = new Message({
          el: document.createElement('div'),
          classAttrs: ['ui', 'error', 'message'],
        });
        let head = new Message({
          el: document.createElement('div'),
          classAttrs: ['header'],
          text: 'Заполни пустые поля!'
        });
        let content = new Message({
          el: document.createElement('p'),
        });
        formLogin.el.appendChild(newMess.el);
        newMess.el.appendChild(head.el);
        newMess.el.appendChild(content.el);
      } else {
        console.log('valid');
        //here request!
      }
    }

    function _resetForm(form){
      let el = document.querySelector('form.'+form);
      console.log(el);
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

    function _submitRegister(event) {
      event.preventDefault();
      console.log('subm register');
      let mess = document.querySelector('div.error.message');
      if( mess != null){
        mess.remove();
      }
      let formData = formRegister.getFormData();
      let empty = tryEmptyField(formRegister, formData);
      let valid = tryValidate(formRegister, formData);
      console.log(valid);
      if ( valid ) {
        let newMess = new Message({
          el: document.createElement('div'),
          classAttrs: ['ui', 'error', 'message'],
        });
        let head = new Message({
          el: document.createElement('div'),
          classAttrs: ['header'],
          text: 'Заполни форму правильно!'
        });
        let content = new Message({
          el: document.createElement('p'),
          text: valid
        });
        // let parent = document.querySelector('form.register');
        // parent.insertBefore(newMess.el, parent.firstChild);
        //formRegister.el.insertBefore(newMess.el, formRegister.el.firstChild);
        formRegister.el.appendChild(newMess.el);
        newMess.el.appendChild(head.el);
        newMess.el.appendChild(content.el);
      } else {
        console.log('valid');
        //here request!!
      }

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
        form.el.querySelector('input[name=' + field + ']').parentNode.classList.add("error");
      })
      return errors;
    }

    function validateEmail(field) {
        let apos = field.indexOf("@");
        let dotpos = field.lastIndexOf(".");
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
            error += "Username от 5 до 15 символов!";
        } else if (illegalChars.test(fld)) {
            error += "Username только буквы, цифры, нижн.подчеркивание!";
        }
        return error;
      }

    function validatePassword(fld, fld2) {
        let error = "",
            illegalChars = /[\W_]/; // allow only letters and numbers

        if ((fld.length < 6) || (fld.length > 15)) {
            error += "Пароль от 6 до 15 символов!";
        }
        if (illegalChars.test(fld)) {
            error += "Пароль только цифры и буквы!";
        }
        if (fld != fld2){
            error += "Повтори пароль правильно!"
        }
        return error;
    }

    function tryValidate(form, formData){
      console.log('try valid');
      let errorMess = '';
      if (! validateEmail(formData.email)) {
        form.el.querySelector('input[name=email]').parentNode.classList.add("error");
        errorMess += 'Заполни правильно Email!';
      }
      let userValid = validateUsername(formData.login);
      if (userValid) {
        form.el.querySelector('input[name=login]').parentNode.classList.add("error");
        errorMess += userValid;
      }
      let passValid = validatePassword(formData.password, formData.passwordRepeat);
      if (passValid) {
        form.el.querySelector('input[name=password]').parentNode.classList.add("error");
        form.el.querySelector('input[name=passwordRepeat]').parentNode.classList.add("error");
        errorMess += passValid;
      }
      console.log(errorMess);
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
