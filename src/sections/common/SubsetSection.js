'use strict';

var _ = require('lodash-node');

function OrderSection(def) {
	_.defaults(this, def, {
		skip : 0,
		limit: 0
	});
}

OrderSection.prototype = {
	constructor: OrderSection,

	toString: function() {
		return _.compact([
			buildPart('SKIP', this.skip),
			buildPart('LIMIT', this.limit)
		]).join(' ');
	}
};

function buildPart(name, value) {
	return value ? [name, value].join(' ') : '';
}

module.exports = OrderSection;
