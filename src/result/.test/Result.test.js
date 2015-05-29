'use strict'

require('chai').should()

var Result = require('../Result')

suite('Result', function() {
	var result = Result({ value: 'id(user)', key: 'userId' })
	suite('initially', function() {
		test('#toString', function() {
			result.toString().should.equal('id(user) as userId')
		})

		test('#toKeyValue', function() {
			result.toKeyValue().should.equal('userId: id(user)')
		})
	})
})

/*
 test('', function() {
 var result = {
 definition: 'user',
 alias: 'user'
 }

 function idSelector(result) {
 return {
 alias: result.alias + 'Id',
 definition: 'id(' + result.definition + ')'
 }
 }

 function EmbedSelector(results){
 return function embedSelector(result) {
 return {
 //key: result.key
 //value:
 }
 }
 }

 EmbedSelector({
 ownSelectors: ['name', 'id'],
 otherResults: [
 { key: 'postId', value: 'id(post)'}
 ]
 })

 var embedded = {
 name: $main.name,
 id: id($main),
 postId: id(post)
 }

 var opts = {
 aggregate: 'count', select:  {
 ownSelectors: []
 }
 }
 })
 */
