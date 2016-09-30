let assert = require('assert');
let plural = require('./public/main').plural;


// Кейсы для функции plural
assert.equal(plural(1), 'раз!');
assert.equal(plural(2), 'раза!');
assert.equal(plural(12), 'раз!');
assert.equal(plural(22), 'раза!');
