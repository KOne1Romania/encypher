"use strict";

var forOwn = require('lodash-node').forOwn;
var generator = require('obj-generator');

/**
 * @param def
 * @param {ResultPart} [parent]
 * @constructor
 */
function ResultPart(def, parent) {
	this.parent = parent;
	this.def = this._normalizeDef(def);
	this._defineAliases(this._propertyAliases());
	this._generateProperties();
}

ResultPart.prototype._generateProperties = function() {
	this._defineReadonly('key', this._key());
	this._defineReadonly('value', this._value());
	this._defineReadonly('alias', this._alias());
};

ResultPart.prototype._defineReadonly = function(name, value) {
	Object.defineProperty(this, name, {
		value: value,
		enumerable: true
	});
};

/**
 * Defines aliases for properties
 * @param {object} propsMap
 * @private
 */
ResultPart.prototype._defineAliases = function(propsMap) {
	forOwn(propsMap, function(property, alias) {
		this._defineReadonly(alias, this[property]);
	}.bind(this));
};

/**
 * Provides aliases -> properties mapping
 * @returns {object} the alias -> property mapping
 * @protected
 */
ResultPart.prototype._propertyAliases = function() {
	return {};
};

/**
 * Returns a valid ResultPart from the provided def
 * @param def
 * @returns {ResultPart}
 * @private
 */
ResultPart.prototype._normalizeDef = function(def) {
	return def;
};

/**
 * @abstract
 * @protected
 * @returns {string}
 */
ResultPart.prototype._key = function() {
	throw new ReferenceError("unimplemented method _key");
};

/**
 * @abstract
 * @protected
 * @returns {string}
 */
ResultPart.prototype._value = function() {
	throw new ReferenceError("unimplemented method _value");
};

/**
 * @protected
 * @returns {string}
 */
ResultPart.prototype._alias = function() {
	return this._key();
};

ResultPart.prototype.withParent = function(parent) {
	if (parent && parent !== this.parent) {
		return generator(this.constructor)(this.def, parent);
	}
	return this;
};

/**
 * @returns {string}
 */
ResultPart.prototype.toString = function() {
	var def = this.value;
	return def == this.alias
		? def
		: [ def, 'as', this.alias].join(' ');
};

module.exports = ResultPart;
