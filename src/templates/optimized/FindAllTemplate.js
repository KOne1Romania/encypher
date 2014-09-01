'use strict';

var _ = require('lodash-node');

var $sections = require('../../sections/optimized');

var SECTION_IDENTIFIERS = [ 'filter', 'order', 'subset', 'return' ];

function FindAllTemplate(def, deps) {
	_.defaults(this, deps, {
		sections: $sections
	});
	SECTION_IDENTIFIERS.forEach(function(sectionIdentifier) {
		var sectionName = buildSectionName(sectionIdentifier);
		this[sectionName] = this.sections[sectionIdentifier](def[sectionName] || {});
	}, this);
}

FindAllTemplate.prototype = {
	constructor: FindAllTemplate,

	_allSections: function() {
		return SECTION_IDENTIFIERS.map(buildSectionName).map(function(sectionName) {
			return this[sectionName];
		}, this);
	},

	toString: function() {
		return _(this._allSections())
			.map(function(section){ return section.toString() })
			.compact()
			.join(' ');
	}
};

function buildSectionName(sectionIdentifier) {
	return sectionIdentifier + 'Section';
}

module.exports = FindAllTemplate;
