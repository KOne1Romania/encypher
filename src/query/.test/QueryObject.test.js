'use strict';

require('chai').should();

var QueryObject = require('../QueryObject');

suite('QueryObject', function() {
	test('no params', function() {
		var paramsFreeString = '$self.name = "a"',
		    emptyParams = {};
		new QueryObject(paramsFreeString, emptyParams).toString().should.eql(paramsFreeString);
	});
	test('number param', function() {
		var originalString = '$self.age = {age}',
		    params = { age: 18 },
		    expectedResult = '$self.age = 18';
		new QueryObject(originalString, params).toString().should.eql(expectedResult);
	});
	test('boolean param', function() {
		var originalString = '$self.flag = {flag}',
		    params = { flag: true },
		    expectedResult = '$self.flag = true';
		new QueryObject(originalString, params).toString().should.eql(expectedResult);
	});
	test('string param', function() {
		var originalString = '$self.name = {name}',
		    params = { name: 'abc' },
		    expectedResult = '$self.name = "abc"';
		new QueryObject(originalString, params).toString().should.eql(expectedResult);
	});
	test('array param', function() {
		var originalString = '$self.flags = {flags}',
		    params = { flags: ['abc', 'def'] },
		    expectedResult = '$self.flags = ["abc", "def"]';
		new QueryObject(originalString, params).toString().should.eql(expectedResult);
	});
	test('object param', function() {
		var originalString = 'set $self = {props}',
		    params = { props: { id: 1, name: "abc" } },
		    expectedResult = 'set $self = {"id": 1, "name": "abc"}';
		new QueryObject(originalString, params).toString().should.eql(expectedResult);
	});
	test('does not replace object literals', function() {
		var originalString = 'return { id: id($self) }',
		    params = {};
		new QueryObject(originalString, params).toString().should.eql(originalString);
	});
});
