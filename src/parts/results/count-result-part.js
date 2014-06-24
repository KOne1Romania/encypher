"use strict";

var inflection = require('inflection');
var ResultPart = require('./result-part');

/**
 * @extends ResultPart
 * @constructor
 */
function CountResultPart() {
	ResultPart.apply(this, arguments);
}

CountResultPart.prototype = Object.create(ResultPart.prototype);

/** @inheritDoc */
CountResultPart.prototype._key = function() {
	return [inflection.pluralize(this.def), 'Count'].join('');
};

/** @inheritDoc */
CountResultPart.prototype._value = function() {
	return ['count(', this.def, ')'].join('');
};

module.exports = CountResultPart;
