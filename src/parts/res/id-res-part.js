"use strict";

var create = require('lodash-node').create;

var FieldResultPart = require('./field-res-part');

function IdResPart(context) {
	FieldResultPart.call(this, 'id', context);
}

IdResPart.prototype = create(FieldResultPart.prototype, {
	constructor: IdResPart,

	value: function() {
		return 'id(' + this.context + ')';
	}

});

module.exports = IdResPart;
