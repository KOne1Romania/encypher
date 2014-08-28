'use strict';

function OptimizedReturnSection(def) {
	_.defaults(this, def, {
		fields: [],
		fetchDescriptors: []
	});
	this.fetchDescriptors = this.fetchDescriptors.map(function(fetchDescriptor) {
		return $fetchDescriptor(fetchDescriptor);
	});
}

OptimizedReturnSection.prototype = {
	constructor: OptimizedReturnSection
};

module.exports = OptimizedReturnSection;
