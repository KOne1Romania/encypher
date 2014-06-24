"use strict";

var $p = require('../parts');

var BaseSection = require('./base-section');

function StartSection() {
	BaseSection.apply(this, arguments);
}

BaseSection.$extendPrototype(StartSection, {
	label       : 'START',
	defaultParts: [ $p.start() ]
});

module.exports = StartSection;
