let assert = require('assert');
let helloText = require('./public/main').helloText;
let filter = require('./public/main').filter;
let plural = require('./public/main').plural;

// Кейсы для функции hello
// assert.equal(helloText('KEK', 3), 'Привет, KEK, ты был тут 3 раза!');
//
// assert.equal(filter('KEK hek KEK'), '*** *** ***');
// Кейсы для функции filter
// assert.equal(filter('KEK'), '***');
// assert.equal(filter('KEK hek KEK'), '*** *** ***');

// Кейсы для функции plural
// assert.equal(plural(1), ' раз!');
// assert.equal(plural(2), ' раза!');
// assert.equal(plural(12), ' раз!');
// assert.equal(plural(22), ' раза!');
