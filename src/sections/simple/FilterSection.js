'use strict';

var _ = require('lodash-node');

var $filterDescriptor = require('../../descriptors').filter,
    $clauses = require('../../clauses');

function FilterSection(def) {
	_.defaults(this, def, {
		filterDescriptors: []
	});
	this.filterDescriptors = this.filterDescriptors.map(function(filterDescriptor) {
		return $filterDescriptor(filterDescriptor);
	})
}

FilterSection.prototype = {
	constructor: FilterSection,

	_matchParts: function() {
		return this.filterDescriptors.map(function(filterDescriptor) {
			return filterDescriptor.matchPart();
		});
	},

	_conditionParts: function() {
		return _(this.filterDescriptors).map(function(filterDescriptor) {
			return filterDescriptor.conditionParts();
		}).flatten().valueOf();
	},

	toString: function() {
		var matchClause = $clauses.match(this._matchParts()),
		    conditionsClause = $clauses.conditions(this._conditionParts());
		return _.compact([matchClause.toString(), conditionsClause.toString()]).join(' ');
	}
};

module.exports = FilterSection;
