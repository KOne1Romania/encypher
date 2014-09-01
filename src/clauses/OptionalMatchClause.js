'use strict';

function OptionalMatchClause(matchParts) {
	this.matchParts = matchParts || [];
	if (!Array.isArray(matchParts)) {
		this.matchParts = [ this.matchParts ];
	}
}

OptionalMatchClause.prototype = {
	constructor: OptionalMatchClause,

	toString: function() {
		return this.matchParts.length ? 'OPTIONAL MATCH ' + this.matchParts.join(', ') : '';
	}
};

module.exports = OptionalMatchClause;
