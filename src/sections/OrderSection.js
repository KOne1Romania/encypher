'use strict';

var _ = require('lodash-node');

var $clauses = require('../clauses'),
    $orderPart = require('../parts').order,
    QueryObject = require('../query/QueryObject');

function OrderSection(def) {
	_.defaults(this, def, {
		orderParts: []
	});
	this.orderParts = this.orderParts.map(function(orderPartDef) {
		return $orderPart(orderPartDef);
	});
}

OrderSection.prototype = {
	constructor: OrderSection,

	queryObject: function() {
		var queryString = $clauses.order(this.orderParts).toString();
		return new QueryObject(queryString);
	},

	toString: function() {
		return this.queryObject().toString();
	}

};

module.exports = OrderSection;
