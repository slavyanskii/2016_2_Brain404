let assert = require('assert');
let hello = require('./public/main').hello;
let filter = require('./public/main').filter;




assert.equal(hello('Test'), 'Привет, Test');
//TODO: Кейсы для функции filter
// assert.equal(filter('КЕК'), '***');

assert.equal(plural(1), ' раз!');
assert.equal(plural(2), ' раза!');
assert.equal(plural(12), ' раз!');
assert.equal(plural(22), ' раза!');
