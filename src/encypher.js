'use strict';

var $templates = require('./templates'),
    $descriptors = require('./descriptors');

var encypher = {
	findTemplate: function(templateDescriptor) {
		return $templates.findAll(templateDescriptor).queryObject();
	},

	countTemplate: function(templateDescriptor) {
		return $templates.count(templateDescriptor).queryObject();
	},

	$entity: $descriptors.entity
};

module.exports = encypher;
