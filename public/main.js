'use strict'
function onSubmit(form) {
    let data = {
        user: form.elements['user'].value,
        email: form.elements['email'].value
    };
    let result =  request('/users', data);
    form.hidden = false;
    window.HelloWorld.innerHTML = hello(data.user, result);
    console.log(data, result);

}
function hello (text, number) {
    return 'Привет, ' + text + ' ты был здесь уже ' + number + ' ' + plural(number);

}

function plural(number) {
    if ((number % 10 === 2 || number % 10 === 3 || number % 10 === 4) && (number < 12 || number > 14)) {
        return ('раза');
    }
    else {
        return ('раз');
    }
}

if (typeof  exports === 'object') {
    exports.hello = hello;
    exports.plural = plural;
}
