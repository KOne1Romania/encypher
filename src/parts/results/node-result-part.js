"use strict";

var ResultPart = require('./result-part');

/**
 * @constructor
 */
function NodeResultPart() {
	ResultPart.apply(this, arguments);
}

NodeResultPart.prototype = Object.create(ResultPart.prototype);

NodeResultPart.prototype.constructor = NodeResultPart;

NodeResultPart.prototype._propertyAliases = function() {
	return { name: 'def' }
};

/** @inheritDoc */
NodeResultPart.prototype._key = function() {
	return this.name;
};

/** @inheritDoc */
NodeResultPart.prototype._value = function() {
	var nameParts = [this.parent, this.name]
		.filter(function(part) {
			return part && part.length > 0;
		});
	return nameParts.join('_');
};

module.exports = NodeResultPart;
