'use strict';

var _ = require('lodash-node');

var $sections = require('../sections'),
    QueryObject = require('../query/QueryObject');

module.exports = function(sectionIdentifiers) {
	function GenericTemplate(def, deps) {
		_.defaults(this, deps, {
			sections: $sections
		});
		sectionIdentifiers.forEach(function(sectionIdentifier) {
			var sectionName = buildSectionName(sectionIdentifier);
			this[sectionName] = this.sections[sectionIdentifier](def[sectionName] || {});
		}, this);
	}

	GenericTemplate.prototype = {
		constructor: GenericTemplate,

		_allSections: function() {
			return sectionIdentifiers.map(buildSectionName).map(function(sectionName) {
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

	return GenericTemplate;
};
