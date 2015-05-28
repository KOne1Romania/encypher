'use strict'

var stampit = require('stampit')

var CypherObject = require('../cypher/CypherObject')

var RelationArc = stampit()
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

module.exports = RelationArc
