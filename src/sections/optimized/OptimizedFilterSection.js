'use strict';

var _ = require('lodash-node');

var $filterDescriptor = require('../../descriptors').filter,
    $clauses = require('../../clauses'),
    $resultParts = require('../../parts/result'),
    QueryObject = require('../../query/QueryObject');

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

	queryObject: function() {
		return QueryObject.merge(this.filterDescriptors.map(filterQueryObject));
	},

	toString: function() {
		return this.filterDescriptors.map(filterSubsection).join(' ');
	}
};

function filterQueryObject(filterDescriptor) {
	return QueryObject.merge([
		$clauses.match(filterDescriptor.matchPart()),
		$clauses.conditions(filterDescriptor.conditionParts()),
		$clauses.with($resultParts.node(), true)
	].map(QueryObject.resolve));
}

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
