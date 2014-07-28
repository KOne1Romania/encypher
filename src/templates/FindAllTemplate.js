'use strict';

var _ = require('lodash-node');

var $sections = require('../sections');

function FindAllTemplate(def) {
	_.defaults(this, def, {
		filterSection: {},
		returnSection: {}
	});
	this.filterSection = $sections.filter(this.filterSection);
	this.returnSection = $sections.return(this.returnSection);
}

FindAllTemplate.prototype = {
	constructor: FindAllTemplate,

	toString: function() {
		return [this.filterSection, this.returnSection].join(' ');
	}
};

module.exports = FindAllTemplate;
