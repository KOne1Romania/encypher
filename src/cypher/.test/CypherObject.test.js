'use strict'

require('chai').should()

var CypherObject = require('../CypherObject')

suite('CypherObject', function() {
	test('no params', function() {
		var paramsFreeString = '$self.`name` = "a"',
		    emptyParams      = {}
		CypherObject({ string: paramsFreeString, params: emptyParams })
			.toString().should.eql(paramsFreeString)
	})
	test('number param', function() {
		var originalString = '$self.age = {age}',
		    params         = { age: 18 },
		    expectedResult = '$self.age = 18'
		var cypherObject = CypherObject({ string: originalString, params: params })
		cypherObject.toString().should.eql(expectedResult)
		cypherObject.string.should.eql(originalString)
	})
	test('boolean param', function() {
		var originalString = '$self.flag = {flag}',
		    params         = { flag: true },
		    expectedResult = '$self.flag = true'
		CypherObject({ string: originalString, params: params }).toString().should.eql(expectedResult)
	})
	test('string param', function() {
		var originalString = '$self.`name` = {name}',
		    params         = { name: 'abc' },
		    expectedResult = '$self.`name` = "abc"'
		CypherObject({ string: originalString, params: params }).toString().should.eql(expectedResult)
	})
	test('array param', function() {
		var originalString = '$self.flags = {flags}',
		    params         = { flags: ['abc', 'def'] },
		    expectedResult = '$self.flags = ["abc", "def"]'
		CypherObject({ string: originalString, params: params }).toString().should.eql(expectedResult)
	})
	test('object param', function() {
		var originalString = 'set $self = {props}',
		    params         = { props: { id: 1, name: "abc" } },
		    expectedResult = 'set $self = {"id": 1, "name": "abc"}'
		CypherObject({ string: originalString, params: params }).toString().should.eql(expectedResult)
	})
	test('two params', function() {
		var originalString = '$self.age < {age} AND $self.name = {name}',
		    params         = { age: 15, name: 'someName' },
		    expectedResult = '$self.age < 15 AND $self.name = "someName"'
		CypherObject({ string: originalString, params: params }).toString().should.eql(expectedResult)
	})
	test('does not replace object literals', function() {
		var originalString = 'return { id: id($self) }',
		    params         = {}
		CypherObject({ string: originalString, params: params }).toString().should.eql(originalString)
	})
	suite('.merge', function() {
		test('w/ separator', function() {
			var qObject1       = CypherObject({ string: '$self.age = {age}', params: { age: 15 } }),
			    qObject2       = CypherObject({ string: '$self.name = {name}', params: { name: 'a' } }),
			    expectedMerged = {
				    string: '$self.age = {age} AND $self.name = {name}',
				    params: { age: 15, name: 'a' }
			    }
			CypherObject.merge([qObject1, qObject2], ' AND ').valueOf()
				.should.eql(expectedMerged)
		})
		test('empty objects', function() {
			var qObjects       = [CypherObject(), CypherObject()],
			    expectedMerged = { string: '', params: {} }
			CypherObject.merge(qObjects).valueOf().should.eql(expectedMerged)
		})
		test('no objects', function() {
			var emptyObjectList = [],
			    expectedMerged  = { string: '', params: {} }
			CypherObject.merge(emptyObjectList).valueOf().should.eql(expectedMerged)
		})
		test('on strings', function() {
			var stringList     = ['a', 'b'],
			    expectedMerged = { string: 'a b', params: {} }
			CypherObject.merge(stringList).valueOf().should.eql(expectedMerged)
		})
	})
})
