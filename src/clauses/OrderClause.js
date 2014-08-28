'use strict';

function OrderClause(orderParts) {
	this.orderParts = orderParts || [];
	if (!Array.isArray(this.orderParts)) {
		this.orderParts = [ this.orderParts ];
	}
}

OrderClause.prototype = {
	constructor: OrderClause,

	toString: function() {
		return !this.orderParts.length ? '' : 'ORDER BY ' + this.orderParts.join(', ');
	}
};

module.exports = OrderClause;
