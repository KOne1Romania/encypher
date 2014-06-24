"use strict";

var inflection = require('inflection');
var ResultPart = require('./result-part');
var NodeResultPart = require('./node-result-part');

/**
 * @extends ResultPart
 * @constructor
 */
function ListResultPart() {
	ResultPart.apply(this, arguments);
}

ListResultPart.prototype = Object.create(ResultPart.prototype);

ListResultPart.prototype._normalizeDef = function(def) {
	return def instanceof ResultPart
		? def.withParent(this.parent)
		: new NodeResultPart(def, this.parent);
};

/** @inheritDoc */
ListResultPart.prototype._key = function() {
	return inflection.pluralize(this.def._key());
};

/** @inheritDoc */
ListResultPart.prototype._value = function() {
	return ['collect(', this.def._value(), ')'].join('');
};

/** @inheritDoc */
ListResultPart.prototype._alias = function() {
	return inflection.pluralize(this.def._alias());
};

module.exports = ListResultPart;
