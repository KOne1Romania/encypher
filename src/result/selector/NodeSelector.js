'use strict'

var Result = require('../Result'),
    BoundNode = require('../../node/BoundNode')

function NodeSelector(node) {
	var nodeAsString = BoundNode(node).toString()
	return Result({
		key: nodeAsString,
		value: nodeAsString
	})
}

module.exports = NodeSelector
