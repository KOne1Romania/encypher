'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var BoundNode    = require('./BoundNode'),
    CypherObject = require('../../cypher/CypherObject')

var UnboundNode = stampit()
	.state({
		label: ''
	})
	.methods({
		toStringWithData: function(dataFieldName) {
			return '(' + this.alias + ':' + this.label + ' ' + dataFieldName + ')'
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

		putStringInContext: function(string) {
			return this.alias + _.capitalize(string)
		},

		bind: function() {
			return BoundNode(_.pick(this, 'alias'))
		}
	})
	.enclose(function() {
		this.alias = this.alias || _.camelCase(this.label)
	})

module.exports = UnboundNode
