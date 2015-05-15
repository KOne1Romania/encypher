'use strict'

var stampit = require('stampit')

exports.Ensure = function(typesMapping) {
	return stampit().enclose(function() {
		Object.keys(typesMapping).forEach(function(field) {
			var typeFactory = typesMapping[field]
			this[field] = typeFactory(this[field])
		}, this)
	})
}