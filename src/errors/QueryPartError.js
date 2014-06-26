"use strict";

var create = require('lodash-node').create;

function QueryPartError(message) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
}

QueryPartError.prototype = create(Error.prototype, {
	constructor: QueryPartError
});

module.exports = QueryPartError;
