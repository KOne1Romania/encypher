'use strict';

function OptionalMatchClause(relationParts) {
	this.relationParts = relationParts || [];
}

OptionalMatchClause.prototype = {
	constructor: OptionalMatchClause,

	toString: function() {
		return this.relationParts.map(function(relationPart) {
			return ['OPTIONAL MATCH', relationPart].join(' ')
		}).join(' ');
	}
};

module.exports = OptionalMatchClause;
