'use strict'

var _ = require('lodash')

var Result            = require('../Result'),
    FieldOrIdSelector = require('./FieldOrIdSelector')

function ExpandSelector(opts) {
	return function(chain) {
		return Result({
			key: chain.toString(),
			value: buildEmbeddedNodeString(chain, opts.fields)
		})
	}
}

function buildEmbeddedNodeString(chain, fields) {
	var allFields = fields
		.map(FieldOrIdSelector)
		.map(function(fieldSelector) { return fieldSelector(chain) })
		.map(_.method('toKeyValue'))
		.join(', ')
	return '{ ' + allFields + ' }'
}

module.exports = ExpandSelector
