"use strict";

var inflection = require('inflection');
var create = require('lodash-node').create;

var ResPart = require('./res-part');

function CollectResPart(resPart, context) {
	ResPart.call(this, context);
	this.resPart = resPart.withContext(context);
}

CollectResPart.prototype = create(ResPart.prototype, {
	constructor: CollectResPart,

	value: function() {
		return 'collect(distinct ' + this.resPart.value() + ')';
	},

	alias: function() {
		return inflection.pluralize(this.resPart.alias());
	},

	withSelf: function(self) {
		if (!self) {
			return this;
		}
		this.context.self = self;
		this.resPart = this.resPart.withSelf(self);
		return this;
	}
});

module.exports = CollectResPart;
