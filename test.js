let assert = require('assert');
let hello = require('./public/main').hello;
let filter = require('./public/main').filter;
let plural = require('./public/main').plural;

// Кейсы для функции filter
assert.equal(filter('КЕК'), '***');
assert.equal(filter('КЕК hek КЕК'), '*** *** ***');

// Кейсы для функции plural
assert.equal(plural(1), ' раз!');
assert.equal(plural(2), ' раза!');
assert.equal(plural(12), ' раз!');
assert.equal(plural(22), ' раза!');
