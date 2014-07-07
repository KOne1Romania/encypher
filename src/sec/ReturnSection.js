"use strict";

var $r = require('../parts').results;

function ReturnSection(entityDescriptor) {
	this.fields = entityDescriptor.fields;
}

ReturnSection.prototype.toString = function() {
	var resultMap = $r.map([$r.id()].concat(this.fields)).toString();
	return  ['RETURN', resultMap].join(' ');
};

module.exports = ReturnSection;
