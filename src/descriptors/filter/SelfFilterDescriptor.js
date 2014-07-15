'use strict';

var _ = require('lodash-node');

var $nodeDescriptor = require('../node'),
    $condition = require('../../conditions'),
    DescriptorArgsError = require('../../errors/DescriptorArgsError');

function SelfFilterDescriptor(def) {
	_.defaults(this, def, {
		nodeDescriptor: {},
		conditions    : []
	});
	if (this.nodeDescriptor.label == null) {
		var errorMessage = 'the received nodeDescriptor requires a `label`';
		throw new DescriptorArgsError(errorMessage);
	}
	this.conditions = this.conditions.map(function(conditionDef) {
		return $condition(conditionDef)
	});
	this.nodeDescriptor = $nodeDescriptor(_.merge(this.nodeDescriptor, { alias: '$self' }));
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
