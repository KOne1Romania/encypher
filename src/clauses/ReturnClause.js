'use strict';

function ReturnClause(resultParts) {
	this.resultParts = resultParts || [];
}

ReturnClause.prototype = {
	constructor: ReturnClause,

	toString: function() {
		return 'RETURN ' + this.resultParts.map(_callMethod('value')).join(', ');
	}
};

function _callMethod(methodName) {
	return function(obj) {
		return obj[methodName]();
	}
}

module.exports = ReturnClause;
