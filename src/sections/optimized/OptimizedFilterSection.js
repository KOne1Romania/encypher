'use strict';

var _ = require('lodash-node');

var $filterDescriptor = require('../../descriptors/index').filter,
    $clauses = require('../../clauses/index'),
    $resultParts = require('../../parts/result');

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

	toString: function() {
		return this.filterDescriptors.map(filterSubsection).join(' ');
	}
};

function filterSubsection(filterDescriptor) {
	return _([
		$clauses.match(filterDescriptor.matchPart()),
		$clauses.conditions(filterDescriptor.conditionParts()),
		$clauses.with($resultParts.node(), true)
	]).map(function(clause) {
		return clause.toString();
	}).compact().join(' ')
}

module.exports = FilterSection;
