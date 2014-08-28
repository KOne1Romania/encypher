'use strict';

var _ = require('lodash-node');

var $resultParts = require('./result');

function OrderPart(def) {
	_.defaults(this, def, {
		direction: 'asc'
	});
}

OrderPart.prototype = {
	constructor: OrderPart,

	toString: function() {
		return _.compact([
			$resultParts.field(this.field).value(),
			this.direction.toUpperCase()
		]).join(' ');
	}
};

module.exports = OrderPart;
