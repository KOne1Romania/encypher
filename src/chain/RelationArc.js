'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var CypherObject = require('../cypher/CypherObject')

var _RelationArc = stampit()
	.state({
		type: '',
		arrow: 'right',
		alias: ''
	})
	.methods({
		toAliasCypher: function() {
			if (_.isEmpty(this.alias)) {
				throw Error('Relation ' + this.type + ' must have alias')
			}
			return CypherObject.fromString(this.alias)
		},

		toCypher: function(leftNode, rightNode) {
			var arcArrowString = this._makeArcArrowString(),
			    cypherString   = leftNode + arcArrowString + rightNode
			return CypherObject.fromString(cypherString)
		},

		_makeArcArrowString: function() {
			var arrowDecorators    = ARROWS[this.arrow],
			    relationTypeString = '[' + this.alias + ':' + this.type + ']'
			return arrowDecorators.before + relationTypeString + arrowDecorators.after
		}
	})
	.enclose(function() {
		if (this.alias === '$default') {
			this.alias = makeAliasFromType(this.type)
		}
	})

function makeAliasFromType(type) {
	return '$r_' + type.toLowerCase()
}

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
