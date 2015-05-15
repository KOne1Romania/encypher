'use strict'

var StartClause = require('../StartClause')

module.exports = function() {
	test('ok', function() {
		StartClause({
			startPart: { alias: 'tag', ids: [1, 2, 3] }
		}).toString().should.eql('START tag = node(1, 2, 3)')
	})
}
