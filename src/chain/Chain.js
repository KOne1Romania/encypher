'use strict'

var EmptyChain = require('./EmptyChain')

var Chain = EmptyChain.compose()

Chain.EMPTY = EmptyChain()

module.exports = Chain
