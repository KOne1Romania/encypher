'use strict';

var _ = require('lodash-node');

var $fetchDescriptor = require('../descriptors').fetch,
    $resultParts = require('../parts').result;

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

	_returnPart: function() {
		return 'RETURN ' + $resultParts.map(this._resultParts());
	},

	_matchRelationsPart: function() {
		return this.fetchDescriptors.map(function(fetchDescriptor) {
			return ['OPTIONAL MATCH', fetchDescriptor.matchPart()].join(' ')
		}).join(' ');
	},

	toString: function() {
		return _.compact([this._matchRelationsPart(), this._returnPart()]).join(' ');
	}
};

module.exports = ReturnSection;
