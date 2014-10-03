'use strict';

var _ = require('lodash-node');

var encode = require('../util/encode');

function QueryObject(string, params) {
	this.string = string || "";
	this.params = params || {};
}

QueryObject.prototype = {
	constructor: QueryObject,

	toString: function() {
		var variableNames = findInterpolatedNames(this.string);
		variableNames.forEach(function(varName) {
			var varToken = varNameToToken(varName);
			var encodedValue = encode.value(this.params[varName]);
			this.string = this.string.replace(varToken, encodedValue);
		}, this);
		return this.string;
	},

	valueOf: function() {
		return {
			string: this.string,
			params: this.params
		}
	}
};

QueryObject.merge = function QueryObject_merge(qObjects, opts) {
	qObjects = qObjects || [];
	_.defaults(opts, {
		separator: ' ',
		left     : '',
		right    : ''
	});
	var fullString = _.map(qObjects, function(qObject) {
		    return opts.left + qObject.string + opts.right;
	    }).join(opts.separator),
	    combinedParams = _.map(qObjects, 'params').reduce(_.merge);
	return new QueryObject(fullString, combinedParams);
};

/**
 * looks for {interpolated} variable names inside a string
 * @param string
 * @return [string] the list of variable names (without enclosing {})
 */
function findInterpolatedNames(string) {
	var interpolatedTokens = string.match(/{[^:]+}/g) || [];
	return interpolatedTokens.map(tokenToVarName);
}

function tokenToVarName(token) {
	return token.slice(1, -1);
}

function varNameToToken(varName) {
	return '{' + varName + '}';
}

QueryObject.varNameToToken = varNameToToken;
module.exports = QueryObject;
