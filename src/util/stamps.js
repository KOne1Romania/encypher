'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

exports.Ensure = function(typesMapping) {
	return stampit().enclose(function() {
		Object.keys(typesMapping).forEach(function(field) {
			var typeFactory = typesMapping[field]
			this[field] = typeFactory(this[field])
		}, this)
	})
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