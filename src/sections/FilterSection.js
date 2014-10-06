'use strict';

var _ = require('lodash-node');

var $filterDescriptor = require('../descriptors/index').filter,
    $clauses = require('../clauses/index'),
    $resultParts = require('../parts/result/index'),
    QueryObject = require('../query/QueryObject');

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
		return this.queryObject().toString();
	}
};

function filterQueryObject(filterDescriptor) {
	return QueryObject.merge([
		$clauses.match(filterDescriptor.matchPart()),
		$clauses.conditions(filterDescriptor.conditionParts()),
		$clauses.with($resultParts.node(), true)
	].map(QueryObject.resolve));
}

module.exports = FilterSection;
