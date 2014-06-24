"use strict";

var inflection = require('inflection');
var ResultPart = require('./result-part');

/**
 * @constructor
 */
function PropertyResultPart() {
	ResultPart.apply(this, arguments);
}

PropertyResultPart.prototype = Object.create(ResultPart.prototype);

PropertyResultPart.prototype.constructor = PropertyResultPart;

PropertyResultPart.prototype._propertyAliases = function() {
	return {
		property: 'def',
		node: 'parent'
	}
};

/** @inheritDoc */
PropertyResultPart.prototype._key = function() {
	return this.property;
};
/** @inheritDoc */
PropertyResultPart.prototype._value = function() {
	return [this.node, this.property].join('.');
};

/** @inheritDoc */
PropertyResultPart.prototype._alias = function() {
	return [this.node, inflection.capitalize(this.property)].join('');
};

module.exports = PropertyResultPart;
