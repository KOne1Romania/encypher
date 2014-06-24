"use strict";

var SECTION_NAMES = [
	'startNode', 'optionalRels', 'returnResult'
];

function QueryStructure() {
	this.sections = {}
}

QueryStructure.prototype.addTo = function(sectionName, part) {
	if (!this.sections.hasOwnProperty(sectionName)) {
		this.sections[sectionName] = [];
	}
	this.sections[sectionName].push(part);
};

QueryStructure.prototype.assemble = function() {

};
