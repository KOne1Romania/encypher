'use strict';

var defn = require('defn');
var generator = require('obj-generator');

var BareNodeDescriptor = require('./BareNodeDescriptor');
var LabeledNodeDescriptor = require('./LabeledNodeDescriptor');

var nodeDescriptor = module.exports = defn({
	String: generator(BareNodeDescriptor),
	'{label: String, alias: *}': generator(LabeledNodeDescriptor)
});

nodeDescriptor.Bare = BareNodeDescriptor;
nodeDescriptor.Labeled = LabeledNodeDescriptor;
