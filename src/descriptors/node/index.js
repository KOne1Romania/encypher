'use strict';

var NodeDescriptor = require('./NodeDescriptor');
var BareNodeDescriptor = require('./BareNodeDescriptor');
var LabeledNodeDescriptor = require('./LabeledNodeDescriptor');

var nodeDescriptor = module.exports = function(def) {
	switch (true) {
		case def instanceof NodeDescriptor:
			return def;
		case def != null && def.hasOwnProperty('label'):
			return new LabeledNodeDescriptor(def);
		case typeof def === 'object':
		case def == null:
			return new BareNodeDescriptor(def);
	}
};

nodeDescriptor.Base = NodeDescriptor;
nodeDescriptor.Bare = BareNodeDescriptor;
nodeDescriptor.Labeled = LabeledNodeDescriptor;
