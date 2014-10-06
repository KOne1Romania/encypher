'use strict';

var QueryObject = require('../query/QueryObject');

function MatchClause(matchParts) {
	this.matchParts = matchParts || [];
	if (!Array.isArray(matchParts)) {
		this.matchParts = [ this.matchParts ];
	}
}

MatchClause.prototype = {
	constructor: MatchClause,

	toString: function() {
		return this.queryObject().toString();
	},

	queryObject: function() {
		return new QueryObject('MATCH ' + this.matchParts.join(', '));
	}
};

module.exports = MatchClause;
