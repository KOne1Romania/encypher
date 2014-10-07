'use strict';

var $templates = require('./templates');

var encypher = {
	findTemplate: function(templateDescriptor) {
		return $templates.findAll(templateDescriptor);
	},

	countTemplate: function(templateDescriptor) {
		return $templates.count(templateDescriptor);
	}
};

module.exports = encypher;
