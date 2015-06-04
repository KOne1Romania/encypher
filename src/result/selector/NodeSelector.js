'use strict'

var Result = require('../Result')

function NodeSelector(chain) {
	var chainNodeAsString = chain.toString()
	return Result({
		key: chainNodeAsString,
		value: chainNodeAsString
	})
}

module.exports = NodeSelector
