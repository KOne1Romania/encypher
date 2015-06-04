'use strict'

var Result = require('../Result')

function IdSelector(chain) {
	return Result({
		key: chain.toStringWithSuffix('id'),
		value: 'id(' + chain.toString() + ')'
	})
}

module.exports = IdSelector
