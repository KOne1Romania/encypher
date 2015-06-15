'use strict'

var CypherObject = require('../../cypher/CypherObject')

var emptySubsetPart = {
	toCypher: function() {
		return CypherObject.EMPTY
	}
}

module.exports = emptySubsetPart
