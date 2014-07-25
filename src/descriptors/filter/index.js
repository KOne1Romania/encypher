'use strict';

var generator = require('obj-generator'),
    _ = require('lodash-node');

var SelfFilterDescriptor = require('./SelfFilterDescriptor'),
    RelatedFilterDescriptor = require('./RelatedFilterDescriptor');

var filter = module.exports = function(def) {

};

_.merge(filter, {
	self   : generator(SelfFilterDescriptor),
	related: generator(RelatedFilterDescriptor)
});
