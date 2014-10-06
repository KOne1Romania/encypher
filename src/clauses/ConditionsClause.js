'use strict';

var TreeCondition = require('../conditions/TreeCondition'),
    QueryObject = require('../query/QueryObject');

function ConditionsClause(conditionParts) {
	this.treeCondition = new TreeCondition({ children: conditionParts });
	this.conditionParts = conditionParts || [];
}

ConditionsClause.prototype = {
	constructor: ConditionsClause,

	toString: function() {
		return this.queryObject().toString();
	},

	queryObject: function() {
		var conditionsQObject = this.treeCondition.queryObject();
		return conditionsQObject.isEmpty() ? QueryObject.EMPTY : QueryObject.merge(['WHERE', conditionsQObject]);
	}
};

module.exports = ConditionsClause;
