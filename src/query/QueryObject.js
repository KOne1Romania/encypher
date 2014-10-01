'use strict';

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
	}
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

module.exports = QueryObject;
