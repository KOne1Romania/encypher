'use strict'

require('chai').should()

suite('clauses', function() {
	suite('Match', require('./MatchClause.test'))
	suite('With', require('./WithClause.test'))
	suite('Order', require('./OrderClause.test'))
	suite('Start', require('./StartClause.test'))
})
