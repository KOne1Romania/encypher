'use strict';

var _ = require('lodash-node');

var $sections = require('../sections'),
    QueryObject = require('../query/QueryObject');

var SECTION_IDENTIFIERS = [ 'filter', 'returnCount' ];

function CountTemplate(def, deps) {
	_.defaults(this, deps, {
		sections: $sections
	});
	SECTION_IDENTIFIERS.forEach(function(sectionIdentifier) {
		var sectionName = buildSectionName(sectionIdentifier);
		this[sectionName] = this.sections[sectionIdentifier](def[sectionName] || {});
	}, this);
}

CountTemplate.prototype = {
	constructor: CountTemplate,

	_allSections: function() {
		return SECTION_IDENTIFIERS.map(buildSectionName).map(function(sectionName) {
			return this[sectionName];
		}, this);
	},

	queryObject: function() {
		return QueryObject.merge(this._allSections().map(QueryObject.resolve));
	},

	toString: function() {
		return this.queryObject().toString();
	}
};

function buildSectionName(sectionIdentifier) {
	return sectionIdentifier + 'Section';
}

module.exports = CountTemplate;
