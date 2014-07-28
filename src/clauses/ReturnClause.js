'use strict';

function ReturnClause(resultParts) {
	this.resultParts = resultParts || [];
}

ReturnClause.prototype = {
	constructor: ReturnClause,

	toString: function() {
		return 'RETURN ' + this.resultParts.join(', ');
	}
};

module.exports = ReturnClause;
