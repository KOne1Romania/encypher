'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var BoundNode    = require('./BoundNode'),
    CypherObject = require('../cypher/CypherObject')

var UnboundNode = stampit()
	.state({
		label: ''
	})
	.methods({
		buildInstantiateCypher: function(action, data) {
			return this._buildDataCypher(data).prepend(action.toUpperCase())
		},

		buildReturnCypher: function() {
			throw Error('Cannot build Return cypher - node `' + this + '` is not bound')
		},

		buildWithCypher: function() {
			throw Error('Cannot build With cypher - node `' + this + '` is not bound')
		},

		_buildDataCypher: function(data) {
			var dataString = data != null ? ' {data}' : ''
			return CypherObject({
				string: '(' + this.alias + ':' + this.label + dataString + ')',
				params: { data: data }
			})
		},

		toString: function() {
			return '(' + this.alias + ':' + this.label + ')'
		},

		inContext: function(context) {
			return this.withAlias([context.alias, this.alias].join('_'))
		},

		withAlias: function(newAlias) {
			return UnboundNode({
				label: this.label,
				alias: newAlias
			})
		},

		bind: function() {
			return BoundNode(_.pick(this, 'alias'))
		}
	})
	.enclose(function() {
		this.alias = this.alias || _.camelCase(this.label)
	})

module.exports = UnboundNode
