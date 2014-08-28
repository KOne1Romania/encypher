'use strict';

function MatchClause(matchParts) {
	this.matchParts = matchParts || [];
	if (!Array.isArray(matchParts)) {
		this.matchParts = [ this.matchParts ];
	}
}

MatchClause.prototype = {
	constructor: MatchClause,

	toString: function() {
		return 'MATCH ' + this.matchParts.join(', ');
	}
};

module.exports = MatchClause;
