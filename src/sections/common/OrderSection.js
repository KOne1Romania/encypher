'use strict';

var _ = require('lodash-node');

var $clauses = require('../../clauses/index'),
    $orderPart = require('../../parts/index').order;

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

	toString: function() {
		return $clauses.order(this.orderParts).toString();
	}
};

module.exports = OrderSection;
