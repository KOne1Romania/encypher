'use strict';

var _ = require('lodash-node'),
    ensureInstance = require('ensure-instance');

var RelationData = require('../data/RelationData'),
    $resultParts = require('../parts').result;

function ReturnSection(fields, relationDataList) {
	this.fields = fields || [];
	this.relationDataList = (relationDataList || []).map(function(relationData) {
		return ensureInstance(RelationData)(relationData);
	});
}

ReturnSection.prototype = {
	constructor: ReturnSection,

	_ownResultParts: function() {
		return [$resultParts.id()].concat(this.fields);
	},

	_relatedResultParts: function() {
		return this.relationDataList.map(function(relationData) {
			return relationData.resultPart()
		});
	},

	_resultParts: function() {
		return this._ownResultParts().concat(this._relatedResultParts());
	},

	_returnPart: function() {
		return 'RETURN ' + $resultParts.map(this._resultParts());
	},

	_matchRelationsPart: function() {
		return this.relationDataList.map(function(relationData) {
			return ['OPTIONAL MATCH', relationData.matchPart()].join(' ')
		}).join(' ');
	},

	toString: function() {
		return _.compact([this._matchRelationsPart(), this._returnPart()]).join(' ');
	}
};

module.exports = ReturnSection;
