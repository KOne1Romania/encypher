'use strict';

var $resultParts = require('../parts/result'),
    QueryObject = require('../query/QueryObject');

function WithClause(resultParts, distinct) {
	this.resultParts = resultParts || [ $resultParts.node() ];
	if (!Array.isArray(this.resultParts)) {
		this.resultParts = [ this.resultParts ];
	}
	this.distinct = distinct;
}

WithClause.prototype = {
	constructor: WithClause,

	toString: function() {
		return this.queryObject().toString();
	},

	queryObject: function() {
		return new QueryObject('WITH ' + (this.distinct ? 'distinct ' : '') + this.resultParts.join(', '));
	}
};

module.exports = WithClause;
