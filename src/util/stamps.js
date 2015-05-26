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