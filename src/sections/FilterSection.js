'use strict';

var _ = require('lodash-node');

var $filterDescriptor = require('../descriptors').filter;

function FilterSection(filterDescriptors) {
	this.filterDescriptors = (filterDescriptors || []).map(function(filterDescriptor) {
		return $filterDescriptor(filterDescriptor);
	})
}

FilterSection.prototype = {
	constructor: FilterSection,

	_matchString: function() {
		return this.filterDescriptors.map(function(filterDescriptor) {
			return filterDescriptor.matchPart();
		}).join(', ');
	},

	_conditionsString: function() {
		return _(this.filterDescriptors).map(function(filterDescriptor) {
			return filterDescriptor.conditionParts();
		}).flatten().join(' AND ');
	},

	_matchSubsection: function() {
		return 'MATCH ' + this._matchString();
	},

	_conditionsSubsection: function() {
		var conditionsString = this._conditionsString();
		return conditionsString.length
			? 'WHERE ' + conditionsString
			: '';
	},

	toString: function() {
		return _.compact([this._matchSubsection(), this._conditionsSubsection()]).join(' ');
	}
};

module.exports = FilterSection;
