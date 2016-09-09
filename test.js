let assert = require('assert');
let hello = require('./public/main').hello;
let plural = require('./public/main').plural;

assert.equal(plural(1), ' раз!');
assert.equal(plural(2), ' раза!');
assert.equal(plural(12), ' раз!');
assert.equal(plural(22), ' раза!');
