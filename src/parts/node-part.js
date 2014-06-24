"use strict";

var inflection = require('inflection');

/**
 * @param {string} label
 * @param {string} [name]
 * @constructor
 */
function NodePart(label, name) {
	this.label = label;
	this.name = name || inflection.camelize(label, true);
}

NodePart.prototype = {

	constructor: NodePart,

	toString: function() {
		return '(' + [this.name, this.label].join(':') + ')';
	}

};

module.exports = NodePart;
