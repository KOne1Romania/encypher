'use strict';

var _ = require('lodash-node');

var $relationDescriptor = require('..').relation,
    $condition = require('../../conditions'),
    DescriptorArgsError = require('../../errors/DescriptorArgsError');

function RelatedFilterDescriptor(def) {
	_.defaults(this, def, {
		relation  : {},
		conditions: []
	});
	if (this.relation.type == null || this.relation.related == null) {
		throw new DescriptorArgsError('got invalid relationDescriptor ', this.relation);
	}
	this.relation = $relationDescriptor(this.relation).withContext(this.context);
	this.conditions = this.conditions.map(function(conditionDef) {
		return $condition(conditionDef).on(this.relation.identifier).on(this.context);
	}.bind(this));
}

RelatedFilterDescriptor.prototype = {
	constructor: RelatedFilterDescriptor,

	matchPart: function() {
		return this.relation.matchPart();
	},

	conditionParts: function() {
		return this.conditions;
	}

};

module.exports = RelatedFilterDescriptor;
