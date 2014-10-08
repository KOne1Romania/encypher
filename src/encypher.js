'use strict';

var $templates = require('./templates');

var encypher = {
	findTemplate: function(templateDescriptor) {
		return $templates.findAll(templateDescriptor).queryObject();
	},

	countTemplate: function(templateDescriptor) {
		return $templates.count(templateDescriptor).queryObject();
	}
};

module.exports = encypher;
