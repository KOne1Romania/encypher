'use strict'

var EmptyChain = require('./EmptyChain')

var Chain = EmptyChain.compose()

Chain.fromNodeLabeled = function(label) {
	return EmptyChain().addNode({ label: label })
}

Chain.EMPTY = EmptyChain()

module.exports = Chain
