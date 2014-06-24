"use strict";

var PropertyResultPart = require('./property-result-part');

/**
 * @extends PropertyResultPart
 * @constructor
 */
function IdResultPart(def, node) {
	if (!node) {
		node  = def;
		def = 'id';
	}
	PropertyResultPart.call(this, def, node);
}

IdResultPart.prototype = Object.create(PropertyResultPart.prototype);

IdResultPart.prototype.constructor = IdResultPart;

/** @inheritDoc */
IdResultPart.prototype._value = function() {
	return ['id(', this.node, ')'].join('');
};

module.exports = IdResultPart;
