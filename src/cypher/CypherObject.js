'use strict'

var _       = require('lodash'),
    stampit = require('stampit')

var encode = require('../util/encode')

var TOKEN_REGEX = /{[^:]+?}/g

var CypherObject = stampit()
	.state({
		string: '',
		params: {}
	})
	.methods({
		toString: function() {
			var resultString  = this.string,
			    variableNames = findInterpolatedNames(this.string)
			variableNames.forEach(function(varName) {
				var varToken = varNameToToken(varName)
				var encodedValue = encode.value(this.params[varName])
				resultString = resultString.replace(varToken, encodedValue)
			}, this)
			return resultString.replace(/node\(\[(.*)\]\)/, 'node($1)')
		},

		valueOf: function() {
			return _.pick(this, ['string', 'params'])
		},

		surround: function(left, right) {
			return CypherObject({
				string: left + this.string + right,
				params: this.params
			})
		},

		isEmpty: function() {
			return !this.string.length
		},

		withString: function(newString) {
			return CypherObject({
				string: newString,
				params: this.params
			})
		},

		prepend: function(prefixString, separator) {
			var prefixedString = _.compact([prefixString, this.string]).join(separator || ' ')
			return this.withString(prefixedString)
		},

		append: function(suffixString, separator) {
			var suffixedString = _.compact([this.string, suffixString]).join(separator || ' ')
			return this.withString(suffixedString)
		},

		merge: function(otherCypherObject) {
			return CypherObject.merge([this, otherCypherObject])
		}
	})

CypherObject.fromString = function(cypherString) {
	return CypherObject({ string: String(cypherString) })
}

CypherObject.merge = function CypherObject_merge(qObjects, separator) {
	qObjects = qObjects || []
	separator = separator || ' '
	var fullString = _(qObjects).map(function(qObject) {
		return qObject.string != null ? qObject.string : qObject
	}).compact().join(separator)
	var combinedParams = _.map(qObjects, 'params').reduce(_.merge, {})

	return CypherObject({
		string: fullString,
		params: combinedParams
	})
}

CypherObject.EMPTY = CypherObject()

function findInterpolatedNames(string) {
	var interpolatedTokens = string.match(TOKEN_REGEX) || []
	return interpolatedTokens.map(tokenToVarName)
}

function tokenToVarName(token) {
	return token.slice(1, -1)
}

function varNameToToken(varName) {
	return '{' + varName + '}'
}

CypherObject.varNameToToken = varNameToToken
module.exports = CypherObject
