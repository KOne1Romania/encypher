'use strict'

var _ = require('lodash')

var Result            = require('../Result'),
    FieldOrIdSelector = require('./FieldOrIdSelector')

function ExpandSelector(opts) {
	opts = _.defaults({}, opts, { fields: [], results: [] })
	return function(chain) {
		return Result({
			key: chain.toString(),
			value: buildEmbeddedNodeString(chain, opts)
		})
	}
}

function buildEmbeddedNodeString(chain, opts) {
	var allKeyValues = getKeyValuesFromFields(opts.fields, chain)
		.concat(getKeyValuesFromResults(opts.results))
		.join(', ')
	return '{ ' + allKeyValues + ' }'
}

function getKeyValuesFromFields(fields, chain) {
	var fieldResults = fields
		.map(FieldOrIdSelector)
		.map(function(fieldSelector) { return fieldSelector(chain) })
	return getKeyValuesFromResults(fieldResults)
}

function getKeyValuesFromResults(results) {
	return results
		.map(Result)
		.map(_.method('toKeyValue'))
}

module.exports = ExpandSelector
