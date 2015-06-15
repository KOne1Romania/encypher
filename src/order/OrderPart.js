'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var FieldSelector = require('../result/selector/FieldSelector'),
    CypherObject  = require('../cypher/CypherObject')

var _OrderPart = stampit()
	.state({
		field: '',
		direction: 'asc'
	})
	.methods({
		applyOn: function(chain) {
			var fieldResult         = this.fieldSelector(chain),
			    fieldOrderStatement = fieldResult.toOrderStatement(this.direction)
			return CypherObject.fromString(fieldOrderStatement)
		}
	})
	.enclose(function() {
		this.fieldSelector = FieldSelector(this.field)
	})

function OrderPart(state) {
	if (_.isString(state)) {
		return _OrderPart({ field: state })
	}
	return _OrderPart(state)
}

module.exports = OrderPart
