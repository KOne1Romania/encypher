'use strict';

var _ = require('lodash-node');

var $basicSections = require('../../sections/simple');

function FindAllTemplate(def, deps) {
	_.defaults(this, def, {
		filterSection: {},
		returnSection: {}
	});
	_.defaults(this, deps, {
		sections: $basicSections
	});
	this.filterSection = this.sections.filter(this.filterSection);
	this.returnSection = this.sections.return(this.returnSection);
}

FindAllTemplate.prototype = {
	constructor: FindAllTemplate,

	toString: function() {
		return [this.filterSection, this.returnSection].join(' ');
	}
};

module.exports = FindAllTemplate;
