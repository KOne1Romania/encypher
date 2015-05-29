'use strict'

var stampit = require('stampit'),
    _       = require('lodash')


var CypherObject = require('../cypher/CypherObject')

var _RelationArc = stampit()
	.state({
		type: '',
		arrow: 'right'
	})
	.methods({
		toCypher: function(leftNode, rightNode) {
			var arcArrowString = this._makeArcArrowString(),
			    cypherString   = leftNode + arcArrowString + rightNode
			return CypherObject.fromString(cypherString)
		},

		_makeArcArrowString: function() {
			var arrowDecorators    = ARROWS[this.arrow],
			    relationTypeString = '[:' + this.type + ']'
			return arrowDecorators.before + relationTypeString + arrowDecorators.after
		}
	})

var ARROWS = {
	right: { before: '-', after: '->' },
	left: { before: '<-', after: '-' }
}

function RelationArc(state) {
	return _.isString(state)
		? _RelationArc({ type: state })
		: _RelationArc(state)
}

module.exports = RelationArc
