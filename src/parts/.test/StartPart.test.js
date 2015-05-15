'use strict'

var start = require('..').start

module.exports = function() {
	test('ok', function() {
		start({
			ids: [1, 2, 3],
			alias: 'tag'
		}).toString().should.eql('tag = node(1, 2, 3)')
	})
}
