'use strict';

var NodeDescriptor = require('./NodeDescriptor');
var BareNodeDescriptor = require('./BareNodeDescriptor');
var LabeledNodeDescriptor = require('./LabeledNodeDescriptor');

var nodeDescriptor = module.exports = function(def) {
	switch (true) {
		case def instanceof NodeDescriptor:
			return def;
		case typeof def === 'string':
		case def == null:
			return new BareNodeDescriptor(def);
		case def.hasOwnProperty('label'):
			return new LabeledNodeDescriptor(def);
	}
};

nodeDescriptor.Bare = BareNodeDescriptor;
nodeDescriptor.Labeled = LabeledNodeDescriptor;
