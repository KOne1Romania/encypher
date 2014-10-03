'use strict';

require('chai').should();

var QueryObject = require('../QueryObject');

suite('QueryObject', function() {
	test('no params', function() {
		var paramsFreeString = '$self.`name` = "a"',
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
		var originalString = '$self.`name` = {name}',
		    params = { name: 'abc' },
		    expectedResult = '$self.`name` = "abc"';
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
	test('two params', function() {
		var originalString = '$self.age < {age} AND $self.name = {name}',
		    params = { age: 15, name: 'someName' },
		    expectedResult = '$self.age < 15 AND $self.name = "someName"';
		new QueryObject(originalString, params).toString().should.eql(expectedResult);
	});
	test('does not replace object literals', function() {
		var originalString = 'return { id: id($self) }',
		    params = {};
		new QueryObject(originalString, params).toString().should.eql(originalString);
	});
	test('#surround', function() {
		var originalString = 'a', left = '(', right = ')',
		    expectedResult = '(a)';
		new QueryObject(originalString, {}).surround(left, right).toString().should.eql(expectedResult);
	});
	suite('.merge', function() {
		test('w/ separator', function() {
			var qObject1 = new QueryObject('$self.age = {age}', { age: 15 }),
			    qObject2 = new QueryObject('$self.name = {name}', { name: 'a' }),
			    expectedMerged = {
				    string: '$self.age = {age} AND $self.name = {name}',
				    params: { age: 15, name: 'a' }
			    };
			QueryObject.merge([qObject1, qObject2], ' AND ').valueOf()
				.should.eql(expectedMerged);
		});
		test('empty objects', function() {
			var qObjects = [ new QueryObject(), new QueryObject() ],
			    expectedMerged = { string: '', params: {} };
			QueryObject.merge(qObjects).valueOf().should.eql(expectedMerged);
		});
		test('no objects', function() {
			var emptyObjectList = [ ],
			    expectedMerged = { string: '', params: {} };
			QueryObject.merge(emptyObjectList).valueOf().should.eql(expectedMerged);
		});
		test('on strings', function() {
			var stringList = ['a', 'b'],
			    expectedMerged = { string: 'a b', params: {} };
			QueryObject.merge(stringList).valueOf().should.eql(expectedMerged);
		});
	});
});
