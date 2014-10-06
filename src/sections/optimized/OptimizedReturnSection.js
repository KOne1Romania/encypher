'use strict';

var _ = require('lodash-node');

var $fetchDescriptor = require('../../descriptors/index').fetch,
    $resultParts = require('../../parts/index').result,
    $clauses = require('../../clauses/index'),
    QueryObject = require('../../query/QueryObject');

function OptimizedReturnSection(def) {
	_.defaults(this, def, {
		fields: [],
		fetchDescriptors: []
	});
	this.fetchDescriptors = this.fetchDescriptors.map(function(fetchDescriptor) {
		return $fetchDescriptor(fetchDescriptor);
	});
}

OptimizedReturnSection.prototype = {
	constructor: OptimizedReturnSection,

	_ownResultParts: function() {
		return [$resultParts.id()].concat(this.fields);
	},

	_relatedResultParts: function() {
		return this.fetchDescriptors.map(function(fetchDescriptor) {
			return $resultParts.node().of(fetchDescriptor.resultPart().alias());
		});
	},

	_resultParts: function() {
		return this._ownResultParts().concat(this._relatedResultParts());
	},

	_fetchSubsection: function() {
		var fetchedEntities = ['$self'];
		return this.fetchDescriptors.reduce(function(clauseStrings, fetchDescriptor) {
			clauseStrings.push(fetchDescriptor != null ? [
				$clauses.optionalMatch(fetchDescriptor.matchPart()),
				$clauses.with(fetchedEntities.concat(fetchDescriptor.resultPart()))
			].join(' ') : '');
			fetchedEntities.push(fetchDescriptor.resultPart().alias());
			return clauseStrings;
		}, []).join(' ');
	},

	queryObject: function() {
		var returnClause = $clauses.return([$resultParts.map(this._resultParts())]),
		    queryString = _.compact([this._fetchSubsection(), returnClause]).join(' ');
		return new QueryObject(queryString);
	},

	toString: function() {
		return this.queryObject().toString();
	}
};

module.exports = OptimizedReturnSection;
