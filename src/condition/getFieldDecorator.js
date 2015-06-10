'use strict'

var _          = require('lodash'),
    inflection = require('inflection')

function getFieldDecorator(operator) {
	var decorator = fieldDecoratorsMap[operator]
	if (decorator == null) {
		throw Error('Unknown field decorator for operator: ' + operator)
	}
	return decorator
}

var prepend = _.partial(_.partial, joinCamelCase),
    append = _.partial(_.partialRight, joinCamelCase);

function joinCamelCase(first, second) {
	return first + _.capitalize(second)
}

var fieldDecoratorsMap = {
	'eq': _.identity,
	'ne': prepend('wrong'),
	'lt': prepend('max'),
	'gt': prepend('min'),
	'regex': append('regex'),
	'in': inflection.pluralize
}

module.exports = getFieldDecorator
