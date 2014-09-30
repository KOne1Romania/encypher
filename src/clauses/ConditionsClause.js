'use strict';

function ConditionsClause(conditionParts) {
	this.conditionParts = conditionParts || [];
}

ConditionsClause.prototype = {
	constructor: ConditionsClause,

	toString: function() {
		return this.conditionParts.length
			? 'WHERE ' + this.conditionParts.join(' AND ')
			: '';
	}
};

module.exports = ConditionsClause;
