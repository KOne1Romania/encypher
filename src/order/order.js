'use strict'

var OrderPart = require('./OrderPart'),
    _         = require('lodash')

var CypherObject = require('../cypher/CypherObject')

function order(parts) {
	return function orderOnChain(chain) {
		return _(parts).map(OrderPart)
			.map(_.method('applyOn', chain))
			.thru(_.partialRight(CypherObject.merge, ', '))
			.value()
	}
}

module.exports = order
