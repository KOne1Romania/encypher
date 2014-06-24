"use strict";

function BaseSection() {
	this.init.apply(this, arguments);
}

BaseSection.prototype = {
	constructor : BaseSection,
	label       : '',
	separator   : ', ',
	defaultParts: [],

	init: function(parts) {
		parts = parts || this.defaultParts;
		this.parts = Array.isArray(parts) ? parts : [parts];
	},

	toString: function() {
		return [this.label, this._parts()].join(' ');
	},

	_parts: function() {
		return this.parts.join(this.separator);
	}

};

Object.defineProperty(BaseSection, '$extendPrototype', {
	value: function $extend(constructor, protoExtension) {
		var _ = require('lodash-node');
		constructor.prototype = _.create(this.prototype, _.extend(protoExtension, {
			constructor: constructor
		}));
//		Object.defineProperty(constructor, '$extendPrototype', Object.getOwnPropertyDescriptor(this, '$extendPrototype'))
	}
});

module.exports = BaseSection;
