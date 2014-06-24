"use strict";

var BaseSection = require('./base-section');

function OptionalRelsSection() {
	BaseSection.apply(this, arguments);
}

BaseSection.$extendPrototype(OptionalRelsSection, {
	label: 'OPTIONAL MATCH',
	separator: ' OPTIONAL MATCH '
});

module.exports = OptionalRelsSection;
