"use strict";

var ResultPart = require('./result-part');
var PropertyResultPart = require('./property-result-part');

/**
 * @extends ResultPart
 * @constructor
 */
function MapResultPart() {
	ResultPart.apply(this, arguments);
}

MapResultPart.prototype = Object.create(ResultPart.prototype);

MapResultPart.prototype._propertyAliases = function() {
	return { defs: 'def' }
};

MapResultPart.prototype._normalizeDef = function(defs) {
	return defs.map(convertDef.bind(this));
};

/** @inheritDoc */
MapResultPart.prototype._key = function() {
	return this.parent;
};

/** @inheritDoc */
MapResultPart.prototype._value = function() {
	var entries = this.defs.map(function(def) {
		return [def._key(), def._value()].join(': ')
	});
	return ['{', entries.join(', '), '}'].join(' ');
};

module.exports = MapResultPart;

function convertDef(property) {
	return property instanceof ResultPart
		? property.withParent(this.parent)
		: new PropertyResultPart(property, this.parent);
}
