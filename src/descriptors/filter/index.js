'use strict';

var generator = require('obj-generator'),
    _ = require('lodash-node');

var SelfFilterDescriptor = require('./SelfFilterDescriptor'),
    RelatedFilterDescriptor = require('./RelatedFilterDescriptor');

var filter = module.exports = function(def) {
	switch (true) {
		case def.hasOwnProperty('label'):
			return new SelfFilterDescriptor(def);
		case def.hasOwnProperty('relation'):
			return new RelatedFilterDescriptor(def);
	}
};

_.merge(filter, {
	Self   : SelfFilterDescriptor,
	Related: RelatedFilterDescriptor
});
