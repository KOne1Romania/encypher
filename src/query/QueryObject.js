'use strict';

var _ = require('lodash-node');

var encode = require('../util/encode');

var TOKEN_REGEX = /{[^:]+?}/g;

function QueryObject(string, params) {
	this.string = string || '';
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
	},

	surround: function(left, right) {
		this.string = left + this.string + right;
		return this;
	},

	isEmpty: function() {
		return !this.string.length;
	}
};

QueryObject.merge = function QueryObject_merge(qObjects, separator) {
	qObjects = qObjects || [];
	separator = separator || ' ';
	var fullString = _(qObjects).map(function(qObject) {
		    return qObject.string != null ? qObject.string : qObject;
	    }).compact().join(separator),
	    combinedParams = _.map(qObjects, 'params').reduce(_.merge, {});
	return new QueryObject(fullString, combinedParams);
};

QueryObject.resolve = function(qObjectContainer) {
	return typeof qObjectContainer.queryObject === 'function' ? qObjectContainer.queryObject() : {};
};

QueryObject.EMPTY = new QueryObject();

/**
 * looks for {interpolated} variable names inside a string
 * @param string
 * @return [string] the list of variable names (without enclosing {})
 */
function findInterpolatedNames(string) {
	var interpolatedTokens = string.match(TOKEN_REGEX) || [];
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
