'use strict'

var stampit = require('stampit')

var StartPart = stampit()
	.state({
		ids: [],
		alias: ''
	})
	.methods({
		toString: function() {
			return [this.alias, nodeListString(this.ids)].join(' = ')
		}
	})

function nodeListString(ids) {
	return 'node(' + ids.join(', ') + ')'
}

module.exports = StartPart