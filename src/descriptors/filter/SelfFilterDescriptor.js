'use strict';

var _ = require('lodash-node');

var $nodeDescriptor = require('../node'),
    $condition = require('../../conditions'),
    DescriptorArgsError = require('../../errors/DescriptorArgsError');

function SelfFilterDescriptor(def) {
	_.defaults(this, def, {
		conditions: []
	});
	if (this.label == null) {
		var errorMessage = '`label` is required in the arguments map';
		throw new DescriptorArgsError(errorMessage);
	}
	this.conditions = this.conditions.map(function(conditionDef) {
		return $condition(conditionDef)
	});
	this.nodeDescriptor = $nodeDescriptor({ label: this.label, alias: '$self' });
}

SelfFilterDescriptor.prototype = {
	constructor: SelfFilterDescriptor,

	matchPart: function() {
		return this.nodeDescriptor.matchPart();
	},

	conditionParts: function() {
		return this.conditions;
	}

};

module.exports = SelfFilterDescriptor;
