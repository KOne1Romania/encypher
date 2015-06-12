'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

exports.Ensure = function(stampsMapping) {
	return stampit().enclose(function() {
		Object.keys(stampsMapping).forEach(function(field) {
			var stamp = stampsMapping[field]
			this[field] = ensure(this[field], stamp)
		}, this)
	})
}

function ensure(target, stamp) {
	return _.isArray(target)
		? target.map(function(target) { return ensureOne(target, stamp[0]) })
		: ensureOne(target, stamp)
}

function ensureOne(target, stamp) {
	return isStampInstance(target, stamp)
		? target
		: stamp(target)
}

function isStampInstance(target, stamp) {
	var stampProto = _.get(stamp, 'fixed.methods')
	return stampProto && stampProto.isPrototypeOf(target)
}

exports.Cloner = stampit()
	.methods({
		clone: function() {
			return this.getStamp()(this)
		},

		extend: function(fields) {
			return this.getStamp()(_.merge({}, this, fields || {}))
		}
	})

exports.Forwarder = function(methodsMappings) {
	var methods = {}
	_.each(methodsMappings, function(fieldMethods, field) {
		_.each(fieldMethods, function(fieldMethod) {
			methods[fieldMethod] = function() {
				return this[field][fieldMethod].apply(this[field], arguments)
			}
		})
	})
	return stampit().methods(methods)
}

exports.Forwarder.extend = function(methodsMappings) {
	var methods = {}
	_.each(methodsMappings, function(fieldMethods, field) {
		_.each(fieldMethods, function(fieldMethod) {
			methods[fieldMethod] = function() {
				var fields = _.set({}, field, this[field][fieldMethod].apply(this[field], arguments))
				return this.extend(fields)
			}
		})
	})
	return stampit().methods(methods)
}
