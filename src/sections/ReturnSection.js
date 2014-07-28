'use strict';

var _ = require('lodash-node');

var $fetchDescriptor = require('../descriptors').fetch,
    $resultParts = require('../parts').result,
    $clauses = require('../clauses');

function ReturnSection(def) {
	_.defaults(this, def, {
		fields: [],
		fetchDescriptors: []
	});
	this.fetchDescriptors = this.fetchDescriptors.map(function(fetchDescriptor) {
		return $fetchDescriptor(fetchDescriptor);
	});
}

ReturnSection.prototype = {
	constructor: ReturnSection,

	_ownResultParts: function() {
		return [$resultParts.id()].concat(this.fields);
	},

	_relatedResultParts: function() {
		return this.fetchDescriptors.map(function(fetchDescriptor) {
			return fetchDescriptor.resultPart()
		});
	},

	_resultParts: function() {
		return this._ownResultParts().concat(this._relatedResultParts());
	},

	_matchParts: function() {
		return this.fetchDescriptors.map(function(fetchDescriptor) {
			return fetchDescriptor.matchPart();
		});
	},

	toString: function() {
		var returnClause = $clauses.return([$resultParts.map(this._resultParts())]);
		var optionalMatchClause = $clauses.optionalMatch(this._matchParts());
		return _.compact([optionalMatchClause.toString(), returnClause.toString()]).join(' ');
	}
};

module.exports = ReturnSection;
